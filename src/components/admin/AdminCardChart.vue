<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { formatDateFront } from '../../config/utils/dates';
import Chart from 'chart.js/auto';

interface IDays {
  _id: string,
  total: number
}

interface ISection {
  id: number,
  range: string[],
  title: string,
  labelTooltip: string,
  total: number,
  totalLastWeek: number,
  data: IDays[]
};

const props = defineProps<{
  section: ISection,
}>();

const { t } = useI18n();

const demo = async() => {
  const data = props.section.data;

  const element = document.getElementById(String(props.section.id)) as HTMLCanvasElement;

  new Chart(
    element,
    {
      type: 'line',
      options: {
        animation: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            cornerRadius: 5,
            displayColors: false,
            backgroundColor: '#27374D',
            titleFont: {
              size: 12,
              family: 'Poppins',
              weight: 'normal'
            },
            bodyFont: {
              size: 12,
              family: 'Poppins',
            },
          }
        },
        scales: {
          x: {
            display: false  
          },
          y: {
            display: false
          },
        }
      },
      data: {
        labels: data.map(row => formatDateFront(row._id)),
        datasets: [
          {
            label: t(props.section.labelTooltip),
            data: data.map(row => row.total),
            borderColor: '#E57C23',
            tension: 0.5,
            borderJoinStyle: 'miter',
            pointRadius: 3,
            pointBackgroundColor: '#E57C23',
            pointHoverBackgroundColor: '#27374D',
            pointHoverBorderColor: '#E57C23',
            pointHoverBorderWidth: 5,
          }
        ]
      }
    }
  );
};

onMounted(async() => {
  await demo();
})
</script>

<template>
  <article class="admin-card">
    <div class="admin-card__row">
      <div class="admin-card__row--title">
        {{ t(props.section.title) }}
      </div>
      <div class="admin-card__row--total">
        <span class="admin-card__row--total--text">Total:</span> <span class="admin-card__row--total--number">{{ props.section.total }}</span>
      </div>
    </div>
    <div class="admin-card--divider"></div>
    <div class="admin-card__chart">
      <span class="admin-card__chart--text">Altas en la última semana: <span class="admin-card__chart--total">{{ props.section.totalLastWeek }}</span></span>
      <div style="width: 100%; background: #DDE6ED; padding: 1em; margin: 1em 0 0 0; border-radius: 10px;"><canvas :id="props.section.id"></canvas></div>
      <span class="admin-card__chart--info">{{ t('del')}} {{ formatDateFront(props.section.range[0]) }} {{ t('al') }} {{ formatDateFront(props.section.range[1]) }}</span>
    </div>
    <div class="admin-card--divider"></div>
    <div class="admin-card__actions mt-1">
      <button class="btn btn--xs btn--edit mr-1">⚙️ Gestionar</button>
      <button class="btn btn--xs btn--edit">➕ Añadir</button>
    </div> 
  </article>
</template>