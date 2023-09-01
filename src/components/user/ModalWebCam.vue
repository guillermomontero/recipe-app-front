<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiUploadAvatar } from '../../config/api/user';

interface IConstraints {
  audio: boolean,
  video: {
    width: object,
    height: object
  }
};

interface IUser {
  _id: string,
  name: string,
  lastName: string,
  birthDate: string,
  location: Location,
  telephone: number,
}

const props = defineProps<{
  userData: IUser,
}>();

const emits = defineEmits(['close']);

const constraints = ref<IConstraints>({
  audio: false,
  video: {
    width: { min: 150, ideal: 300, max: 400 },
    height: { min: 150, ideal: 300, max: 400 },
  }
});
const hasPicture = ref<boolean>(false);
const fileToSave = ref(null);
const stream = ref(null);
const fileBase64URL = ref(null);
const fileBase64Name = ref(null);
const webcamCapture = ref(null);

const init = async() => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia(constraints.value);
    handleSuccess(stream.value);
  } catch (error) {
    console.log(error);
  }
};

const handleSuccess = (stream) => {
  const video = document.getElementById('video');
  window.stream = stream;
  video.srcObject = stream;
};

const makePicture = () => {
  const canvas = document.getElementById('canvas');
  const video = document.getElementById('video');
  const context = canvas?.getContext('2d');

  context.drawImage(video, 0, 0, 300, 300);
  const image = canvas?.toDataURL('image/jpg', 1).replace(/^data:image\/([^;]*)[^]/, 'data:application/octet-stream;');
  hasPicture.value = true;

  webcamCapture.value = dataURLtoFile(image, `${props.userData._id}.png`);
};

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type: 'image/png'});
};

/** Detenemos la webcam */
const stopCam = async () => {
  if (!stream.value) return;

  stream.value.getTracks()[0].stop();

  stream.value = null;
};

const onSelect = () => {
  fileToSave.value = document.getElementById('fileinput').files[0];
  const reader = new FileReader();
  reader.readAsDataURL(fileToSave.value);
  reader.onload = () => {
    fileBase64URL.value = reader.result;
    fileBase64Name.value = fileToSave.value.name;
  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };
};

const deleteImage = () => {
  const input = document.getElementById('fileinput');
  input.value = null;
  input.type = 'text';
  input.type = 'file';

  fileToSave.value = null;
  fileBase64URL.value = null;
  fileBase64Name.value = null;
}

const sendImage = async (mode: string) => {
  console.log(fileToSave.value);
  console.log(webcamCapture.value);
  const formData = new FormData();
  if (mode === 'file') formData.append('image', fileToSave.value);
  if (mode === 'webcam') formData.append('image', webcamCapture.value);

  try {
    await apiUploadAvatar(formData);
    // TODO: show success alert
  } catch (error) {
    console.log(error);
  }
};

const close = async () => {
  hasPicture.value = false;
  await stopCam();
  emits('close', false);
};

onMounted(() => {
  init();
});
</script>

<template>
  <section class="modal">
    <article class="modal__container w-50">
      <div class="modal__container--close">
        <svg @click.prevent="close" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
      </div>
      <div class="modal__container--wrap mt-2">
        <form @submit.prevent="sendImage('file')" enctype="multipart/form-data" id="form">
          <input type="file" name="image" id="fileinput" accept="image/jpeg, image/png" @change="onSelect">
          <button :disabled="!fileBase64URL" type="submit">Send</button>
        </form>
        <div v-if="fileBase64URL" class="col-md-4">
          <div class="preview">
            <img ref="img" :src="fileBase64URL" alt="">
            <button class="preview__delete" @click="deleteImage">&times;</button>
          </div>
        </div>
        <article class="modal__container--wrap--article">
          <video id="video" playsinline autoplay></video>
          <button class="btn btn--xs btn--edit mt-1" ref="snap" @click="makePicture">📸 {{ $t('hacerFoto') }}</button>
        </article>
        <article class="modal__container--wrap--article">
          <canvas id="canvas" class="webcam-picture" width="300" height="300"></canvas>
        </article>
        <article class="modal__container--wrap--buttons mt-2">
          <button class="btn btn--xs btn--delete mr-1" @click="close">{{ $t('cancelar') }}</button>
          <button :disabled="!hasPicture" class="btn btn--xs btn--delete mr-1" @click="sendImage('webcam')">{{ $t('aceptar') }}</button>
        </article>
      </div>
    </article>
  </section>
</template>
