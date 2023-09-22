<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { apiGetAllUsers } from '../../../config/api/user';
import BaseTable from '../../../components/base/BaseTable.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const data = ref({
  headers: [
    { name: 'name', text: t('nombre'), width: 50, sortable: true, type: 'string' },
    { name: 'lastname', text: t('apellido'), width: 50, sortable: true, type: 'string' },
    { name: 'nickname', text: t('nick'), width: 50, sortable: true, type: 'string' },
    { name: 'email', text: t('email'), width: 50, sortable: true, type: 'string' },
    { name: 'telephone', text: t('telefono'), width: 50, sortable: true, type: 'number' },
    { name: 'birthday', text: t('fechaNacimiento'), width: 50, sortable: true, type: 'date' },
    { name: 'location', text: t('residencia'), width: 50, sortable: true, type: 'boolean' },
    { name: 'imageProfile', text: t('foto'), width: 50, sortable: true, type: 'boolean' },
    { name: 'premium', text: t('premium'), width: 50, sortable: true, type: 'boolean' },
    { name: 'premiumSince', text: t('premiumDesde'), width: 50, sortable: true, type: 'date' },
    { name: 'premiumUntil', text: t('premiumHasta'), width: 50, sortable: true, type: 'date' },
    { name: 'createDate', text: t('fechaCreacion'), width: 50, sortable: true, type: 'date' },
    { name: 'createTime', text: t('horaCreacion'), width: 50, sortable: true, type: 'hour' },
    { name: 'leavingDate', text: t('fechaBaja'), width: 50, sortable: true, type: 'date' },
    { name: 'lastSession', text: t('ultimaSesion'), width: 50, sortable: true, type: 'date' },
    { name: 'role', text: t('rol'), width: 50, sortable: true, type: 'number' },
    { name: 'allowEmail', text: t('aceptaEmail'), width: 50, sortable: true, type: 'boolean' },
    { name: 'allowTerms', text: t('aceptaTerminos'), width: 50, sortable: true, type: 'boolean' },
    { name: 'notifications', text: t('notificaciones'), width: 50, sortable: true, type: 'boolean' },
    { name: 'active', text: t('activo'), width: 50, sortable: true, type: 'boolean' },
  ],
  items: [],
  actions: [
    { name: t('editar'), fn: (e) => editItem(e), icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path><path d="M16 5l3 3"></path></svg>' },
    { name: t('darDeBaja'), fn: (e) => unsuscribeItem(e), icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M12 20l0 -10"></path><path d="M12 20l4 -4"></path><path d="M12 20l-4 -4"></path><path d="M4 4l16 0"></path></svg>' },
    { name: t('eliminar'), fn: (e) => deleteItem(e), icon: '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 7l16 0"></path><path d="M10 11l0 6"></path><path d="M14 11l0 6"></path><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path></svg>' },
  ]
});

const getAllUsers = async () => {
  try {
    const response = await apiGetAllUsers();
    data.value.items = response;
  } catch (err) {
    console.log(err);
  }
}

const editItem = (e) => {
  console.log(e, 'Edit');
}

const unsuscribeItem = (e) => {
  console.log(e, 'Unsuscribe');
}

const deleteItem = (e) => {
  console.log(e, 'Delete');
}

onMounted(() => {
  getAllUsers();
})
</script>

<template>
  <div class="page-title">
    <h3>{{ t('administracionDeUsuarios') }}</h3>
  </div>
  <section class="admin-view mt-2">
    <BaseTable :BTTable="data" />
  </section>
</template>