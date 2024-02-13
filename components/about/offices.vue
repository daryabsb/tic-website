<template>
    <div class="bg-white py-24 sm:py-32">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900">Our offices</h2>
        </div>
        <div
       
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          <div  v-for="office in offices" :key="office.id">
            <h3 class="border-l border-red-600 pl-6 font-semibold text-gray-900">{{office.country}}</h3>
            <address  class="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
              <p v-for="add in office.address" :key="add">{{add}}</p>
            </address>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>


const offices = [
    { id: 1, country: 'China', address: ["(863) 029 872 04820", "china@ticqc.ae"] },
    { id: 2, country: 'Japan', address: ["+81 90 3619 3", "japan@ticqc.ae"] },
    { id: 3, country: 'Kenya', address: ["(254) 700 086 218", "kenya@ticqc.ae"] },
    { id: 4, country: 'Uganda', address: ["(254) 700 086 218", "uganda@ticqc.ae"] },
    { id: 5, country: 'Tanzania', address: ["(254) 700 086 218", "tanzania@ticqc.ae"] },
    { id: 6, country: 'Hong Kong', address: ["852 3565 4631", "hongkong@ticqc.ae"] },
    { id: 7, country: 'Morocco', address: ["212 5 22 92 82 13", "morocco@ticqc.ae"] },
    { id: 8, country: 'Egypt', address: ["(20)109 118 7993 ", "egypt@ticqc.ae"] },
    { id: 9, country: 'Singapore', address: ["00852-5300824", "singapore@ticqc.ae"] },
    { id: 10, country: 'Thailand', address: ["(+66) 2-797-0729 ", "thailand@ticqc.ae"] },
    { id: 11, country: 'Malaysia', address: ["+603 2722 460", "malaysia@ticqc.ae" ] },
    { id: 12, country: 'South Africa', address: ["+27 21 403 64", "southafrica@ticqc.ae"] },
    { id: 13, country: 'United Kingdom', address: ["44 7377 20942", "uk@ticqc.ae"] },
    { id: 14, country: 'Jordan', address: ["+962 79 612 2285", "jordan@ticqc.ae"] },
    { id: 15, country: 'Saudi Arabia', address: ["966 50 911144", "saudiarabia@ticqc.ae"] },

]

</script>