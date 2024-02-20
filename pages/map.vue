<script setup>
import announcementApi from "@/api/announcementApi";
import busRoutesApi from "~/api/busRoutesApi";
definePageMeta({
  layout: "empty",
});
const router = useRouter();
const route = useRoute();
const announcements = ref([]);
const loading = ref(false);
const showToolbar = ref(false);
const showInfo = ref(false);
const showBus = ref(false);
const transports = ref([]);
const selectRoutes = ref([]);
const mapCenter = ref([41.31340266251607, 69.28703784942628]);
const zoom = ref(15);
const currentAnnouce = ref({});
const topColors = [
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Purple",
  "Orange",
  "Pink",
  "Turquoise",
  "Brown",
  "Black",
  "Gray",
  "Beige",
  "Maroon",
  "Navy",
  "Teal",
  "Lime",
  "Indigo",
  "Cyan",
  "Magenta",
];
async function __GET_ANNOUNCEMENTS() {
  let query = { ...route.query };
  if (query.transports) {
    query.transports = query.transports.split(",");
  }
  try {
    loading.value = true;
    const data = await announcementApi.getAnnouncement({ params: { ...query } });
    announcements.value = data?.data?.results.filter((elem) => Number(elem.location_x));
    if (announcements.value.length > 0)
      mapCenter.value = [
        announcements.value[0].location_x,
        announcements.value[0].location_y,
      ];
  } catch (e) {
    console.log(e);
    errorHandle(e);
  } finally {
    loading.value = false;
  }
}
async function filterSend(e) {
  let query = { ...route.query };
  Object.entries(e).forEach(([name, value]) => {
    query[name] = value;
  });
  await router.replace({
    path: "/map",
    query: { ...query },
  });
  __GET_ANNOUNCEMENTS();
}
const handleBusRoute = (number) => {
  const formData = {
    params: {
      url: `https://uz.easyway.info/ajax/en/tashkent/routeInfo/${number}`,
    },
  };
  __GET_BUS_ROUTE(formData, number);
};
// const __GET_BUS_ROUTE = async (formData) => {
//   try {
//     const data = await busRoutesApi.getBusRoute(formData);
//     busRoute.value = data.data.scheme.forward.split(" ").map((elem) => {
//       return {
//         lat: elem.split(",")[0],
//         lng: elem.split(",")[1],
//       };
//     });
//     busRoute2.value = data.data.scheme.backward.split(" ").map((elem) => {
//       return {
//         lat: elem.split(",")[0],
//         lng: elem.split(",")[1],
//       };
//     });
//   } catch (e) {
//     errorHandle(e);
//   } finally {
//   }
// };
const __GET_BUS_ROUTE = async (formData, number) => {
  try {
    const data = await busRoutesApi.getBusRoute(formData);
    let busRoutes = {};
    busRoutes.x = data.data.scheme.forward.split(" ").map((elem) => {
      return {
        lat: elem.split(",")[0],
        lng: elem.split(",")[1],
      };
    });
    busRoutes.y = data.data.scheme.backward.split(" ").map((elem) => {
      return {
        lat: elem.split(",")[0],
        lng: elem.split(",")[1],
      };
    });
    let color = await topColors.filter(
      (elem) => !selectRoutes.value.map((item) => item.color).includes(elem)
    )[0];
    busRoutes.color = color;
    busRoutes.ri = number;
    let currentTransport = transports.value.find((elem) => elem.ri == number);
    currentTransport.color = color;
    transports.value = [...transports.value];
    selectRoutes.value.push(busRoutes);
    let selectedRies = route.query.transports.split(",");
    selectRoutes.value = selectRoutes.value.filter((elem) =>
      selectedRies.includes(elem.ri)
    );
  } catch (e) {
    console.log(e);
    errorHandle(e);
  } finally {
  }
};
async function filterTransport(obj) {
  let query = { ...route.query };
  if (query.transports) {
    query.transports = `${query.transports}`.split(",");
    if (query.transports.includes(obj.ri)) {
      query.transports = query.transports.filter((elem) => elem != obj.ri);
      selectRoutes.value = selectRoutes.value.filter((elem) => elem.ri != obj.ri);
    } else {
      query.transports.push(obj.ri);
    }
  } else {
    query.transports = [];
    query.transports.push(obj.ri);
  }
  if (query.transports.length > 0) {
    query.transports = query.transports.join(",");
  } else {
    delete query.transports;
    selectRoutes.value = [];
  }
  await router.replace({
    path: "/map",
    query: { ...query },
  });
  __GET_ANNOUNCEMENTS();
  const oldSelected = selectRoutes.value.map((elem) => elem.ri);
  const newSelected = route.query?.transports
    .split(",")
    .filter((item) => !oldSelected.includes(item));
  Promise.all([newSelected.map((elem) => handleBusRoute(elem))]);
}
async function clearFilter() {
  await router.replace({
    path: "/map",
    query: {},
  });
  currentSort.value = "appartment_status";
  __GET_ANNOUNCEMENTS();
}
const errorHandle = (error) => {
  error.response
    ? ElNotification({
        title: "Error",
        message: error.response.statusText,
        type: "error",
      })
    : ElNotification({
        title: "Error",
        message: "Serverda xatolik",
        type: "error",
      });
};
async function __GET_TRANSPORT() {
  try {
    loading.value = true;
    const data = await busRoutesApi.getTransport();
    transports.value = data?.data;
    console.log(transports);
  } catch (e) {
    console.log(e);
    errorHandle(e);
  } finally {
    loading.value = false;
  }
}
const toggleToolbar = () => {
  showToolbar.value = !showToolbar.value;
};
const toggleBus = () => {
  showBus.value = !showBus.value;
};

function generateRandomColor() {
  // Generate random values for RGB components
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  // Construct the CSS color string
  var color = "rgb(" + r + ", " + g + ", " + b + ")";

  return color;
}

function generateRandomColorsArray(numColors) {
  var colorsArray = [];

  for (var i = 0; i < numColors; i++) {
    // Generate a random color and add it to the array
    var color = generateRandomColor();
    colorsArray.push(color);
  }

  return colorsArray;
}

// Example usage:
var numColors = 15;
var randomColors = generateRandomColorsArray(numColors);
useAsyncData("announcement", async () => {
  return __GET_ANNOUNCEMENTS();
});
onMounted(() => {
  __GET_TRANSPORT();
  if (route.query?.transports?.length > 0) {
    Promise.all([route.query?.transports.split(",").map((elem) => handleBusRoute(elem))]);
  }
});
const handleAnnounce = (id) => {
  if (currentAnnouce.value?.id == id) {
    showInfo.value = false;
  } else {
    showInfo.value = true;
  }
  currentAnnouce.value = announcements.value.find((elem) => elem.id == id);
};
watch(
  () => showToolbar.value,
  (val) => {
    if (val) showInfo.value = false;
  }
);
watch(
  () => showInfo.value,
  (val) => {
    if (val) showToolbar.value = false;
  }
);
</script>
<template>
  <div>
    <!-- <MapLoader /> -->
    <div class="navbar w-full fixed top-1 flex justify-center left-0 z-[2000]">
      <ul class="px-3 py-3 rounded-xl bg-white flex gap-3">
        <li>
          <button @click="toggleToolbar" :class="{ active: showToolbar }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="svg-icon"
              style="width: 24px; height: 24px; vertical-align: middle; overflow: hidden"
              viewBox="0 0 1024 1024"
              version="1.1"
            >
              <path
                d="M859.02 234.524l0.808-0.756 0.749-0.813c27.047-29.356 33.876-70.34 17.823-106.957-15.942-36.366-50.416-58.957-89.968-58.957H163.604c-38.83 0-73.043 22.012-89.29 57.444-16.361 35.683-10.632 76.301 14.949 106.004l0.97 1.126 280.311 266.85 2.032 312.074c0.107 16.502 13.517 29.805 29.995 29.805l0.2-0.001c16.568-0.107 29.912-13.626 29.804-30.194l-2.198-337.564-296.478-282.241c-9.526-11.758-11.426-26.933-5.044-40.851 6.446-14.059 19.437-22.452 34.75-22.452h624.828c15.6 0 28.69 8.616 35.017 23.047 6.31 14.391 3.924 29.831-6.354 41.497l-304.13 284.832 1.302 458.63c0.047 16.54 13.469 29.916 29.998 29.915h0.087c16.568-0.047 29.962-13.517 29.915-30.085L573.04 502.36l285.98-267.836z"
                fill="black"
              />
              <path
                d="M657.265 595.287c0 16.498 13.499 29.997 29.997 29.997h243.897c16.498 0 29.997-13.498 29.997-29.997 0-16.498-13.499-29.997-29.997-29.997H687.262c-16.498 0-29.997 13.499-29.997 29.997z m273.894 138.882H687.262c-16.498 0-29.997 13.499-29.997 29.997s13.499 29.997 29.997 29.997h243.897c16.498 0 29.997-13.499 29.997-29.997 0-16.498-13.499-29.997-29.997-29.997z m0 168.878H687.262c-16.498 0-29.997 13.499-29.997 29.997s13.499 29.997 29.997 29.997h243.897c16.498 0 29.997-13.499 29.997-29.997 0-16.498-13.499-29.997-29.997-29.997z"
                fill="black"
              />
            </svg>
          </button>
        </li>
        <li>
          <button @click="toggleBus" :class="{ active: showBus }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="24"
              height="24"
              viewBox="0 0 453.543 453.543"
              overflow="visible"
              enable-background="new 0 0 453.543 453.543"
              xml:space="preserve"
            >
              <g id="Bus">
                <path
                  fill="black"
                  d="M367.524,92.122c-4.208-21.045-17.678-29.463-37.882-37.882c-19.918-8.299-67.648-18.229-102.872-18.507      C191.548,36.012,143.819,45.941,123.9,54.24c-20.204,8.418-33.673,16.836-37.882,37.882L70.866,208.794V369.56h26.096v25.211      c0,30.739,44.984,30.739,44.984,0V369.56h83.048h0.263h86.341v25.211c0,30.739,44.983,30.739,44.983,0V369.56h26.096V208.794      L367.524,92.122z M162.625,65.184h62.631h65.662c12.628,0,12.628,18.941,0,18.941h-65.815h-62.478      C149.997,84.125,149.997,65.184,162.625,65.184z M119.472,319.162c-11.918,0-21.58-9.662-21.58-21.58s9.662-21.579,21.58-21.579      s21.58,9.661,21.58,21.579S131.39,319.162,119.472,319.162z M225.256,221.09H110.797c-11.206,0-13.552-8.051-12.452-16.162      l11.793-84.621c1.62-10.281,5.105-17.059,18.444-17.059h96.521h99.857c13.34,0,16.824,6.778,18.443,17.059l11.795,84.621      c1.1,8.111-1.246,16.162-12.452,16.162H225.256z M334.07,319.162c-11.918,0-21.579-9.662-21.579-21.58      s9.661-21.579,21.579-21.579s21.579,9.661,21.579,21.579S345.988,319.162,334.07,319.162z"
                />
                <rect fill="none" width="453.543" height="453.543" />
              </g>
            </svg>
          </button>
        </li>
        <li>
          <button @click="$router.push('/announcements')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              width="24"
              height="24"
              viewBox="0 0 45.58 45.58"
              xml:space="preserve"
            >
              <g>
                <path
                  d="M45.506,33.532c-1.741-7.42-7.161-17.758-23.554-19.942V7.047c0-1.364-0.826-2.593-2.087-3.113   c-1.261-0.521-2.712-0.229-3.675,0.737L1.305,19.63c-1.739,1.748-1.74,4.572-0.001,6.32L16.19,40.909   c0.961,0.966,2.415,1.258,3.676,0.737c1.261-0.521,2.087-1.75,2.087-3.113v-6.331c5.593,0.007,13.656,0.743,19.392,4.313   c0.953,0.594,2.168,0.555,3.08-0.101C45.335,35.762,45.763,34.624,45.506,33.532z"
                />
              </g>
            </svg>
          </button>
        </li>
      </ul>
    </div>
    <div
      class="flex flex-col gap-6 max-w-[400px] fixed top-0 left-1 z-[10000] max-h-[100vh] overflow-y-scroll py-1 filter-toolbar"
      :class="{ toolbarShow: showToolbar }"
    >
      <AppFilter @filter="filterSend" @clear-filter="clearFilter" :loading="loading" />
    </div>
    <div
      class="flex flex-col gap-6 max-w-[500px] w-full fixed top-0 left-1 z-[10000] max-h-[100vh] overflow-y-scroll py-1 filter-toolbar"
      :class="{ toolbarShow: showInfo }"
    >
      <AppMapAnnouceInfo :announcement="currentAnnouce" />
    </div>
    <div
      :class="{ busShow: showBus }"
      class="flex flex-col gap-6 max-w-[416px] w-[416px] fixed top-0 right-1 z-[10000] max-h-[100vh] overflow-y-scroll py-1 filter-bus"
    >
      <div v-if="transports.length > 0" class="bg-white px-4 py-4 rounded-xl">
        <h4 class="text-black font-semibold mb-4 text-[16]">Автобусы поблизости</h4>
        <ul class="bus-list flex flex-wrap gap-2">
          <li
            v-for="transport in transports.filter((item) => item.type == 'BUS')"
            :key="transport?.id"
            @click="filterTransport(transport)"
            class="rounded-[5px] px-1 min-w-8 h-8 flex items-center justify-center buses cursor-pointer text-[14px]"
            :class="{
              active: $route?.query?.transports?.split(',').includes(transport?.ri),
            }"
            :style="`background: ${transport?.color}`"
          >
            {{ transport?.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="map">
      <LMap ref="map" :zoom="zoom" :center="mapCenter">
        <l-control-zoom :position="'topright'"></l-control-zoom>
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          layer-type="base"
          name="OpenStreetMap"
        />
        <l-marker
          v-for="announcement in announcements"
          :key="announcement.id"
          :lat-lng="[announcement?.location_x, announcement?.location_y]"
          @click="handleAnnounce(announcement?.id)"
          ><l-popup>{{ announcement?.title }}</l-popup>
        </l-marker>
        <l-polyline
          :lat-lngs="route.x"
          v-for="(route, index) in selectRoutes"
          :key="index"
          :color="route.color"
          :weight="5"
        ></l-polyline>
        <l-polyline
          :lat-lngs="route.y"
          v-for="(route, index) in selectRoutes"
          :key="index"
          :color="route.color"
          :weight="5"
        ></l-polyline>
        <!-- <l-polyline :lat-lngs="busRoute2" :color="'#7AC335'" :weight="5"></l-polyline> -->
      </LMap>
    </div>
  </div>
</template>

<style lang="css" scoped>
.map {
  height: 100vh;
}
.filter-toolbar::-webkit-scrollbar {
  display: none;
}
.buses {
  transition: 0.2s;
  box-shadow: 0 0 2px rgb(0 0 0/20%), 0 -1px 0 rgb(0 0 0/2%);
}
.bus-list .active {
  /* background: var(--green);// */
  color: #fff;
}
.filter-toolbar {
  transition: 0.5s;
  transform: translateX(-100%);
}
.filter-bus {
  transition: 0.5s;
  transform: translateX(100%);
}
.toolbarShow {
  transform: translateX(0%);
  transition: 0.5s;
}
.busShow {
  transform: translateX(0%);
  transition: 0.5s;
}
.navbar .active svg path {
  fill: var(--green);
}
</style>
