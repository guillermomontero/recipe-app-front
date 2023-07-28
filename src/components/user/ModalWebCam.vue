<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface IConstraints {
  audio: boolean,
  video: {
    width: number,
    height: number
  }
};

const emits = defineEmits(['close']);

const constraints = ref<IConstraints>({
  audio: false,
  video: {
    width: 300,
    height: 300,
  }
});
const hasPicture = ref<boolean>(false);

const init = async() => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints.value);
    handleSuccess(stream);
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
  const download = document.getElementById('download');
  const context = canvas?.getContext('2d');

  context.drawImage(video, 0, 0, 300, 300);
  const image = canvas?.toDataURL('image/jpg', 1).replace(/^data:image\/([^;]*)[^]/, 'data:application/octet-stream;');
  download?.setAttribute('href', image);
  hasPicture.value = true;
};

/** Detenemos la webcam */
const stopCam = async () => {
  const stream = await navigator.mediaDevices.getUserMedia(constraints.value);
  stream.getTracks().forEach((track) => { track.stop(); });
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
    <article class="modal__container w-70">
      <div class="modal__container--close">
        <svg @click.prevent="close" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fill-rule="nonzero"/></svg>
      </div>
      <div class="modal__container--wrap mt-2">
        <article class="modal__container--wrap--article">
          <video id="video" playsinline autoplay></video>
          <button class="btn btn--xs btn--edit mt-1" ref="snap" @click="makePicture">📸 Hacer foto</button>
        </article>
        <article class="modal__container--wrap--article">
          <canvas id="canvas" class="webcam-picture" width="300" height="300"></canvas>
        </article>
        <article class="modal__container--wrap--buttons mt-2">
          <button class="btn btn--xs btn--delete mr-1" @click="close">Cancelar</button>
          <a class="btn  btn--xs btn--edit" id="download" download="downloadImage.jpg" href="#" target="_blank">Download</a>
        </article>
      </div>
    </article>
  </section>
</template>
