<template>
  <div class="HomeSecondBanner row justify-between" id="about">
    <q-parallax src="images/HomeBanner.png">
      <q-intersection transition="scale">
        <div class="text-white">
          <div class="flex-col content text-center">
            <div class="flex-row header-title">LABERU.TECH</div>
            <div class="flex-row sub-title">
              SELECT THE PROJECT TO LABEL NOW.
            </div>
          </div>
        </div>
      </q-intersection>
    </q-parallax>
  </div>
</template>
<style scoped lang="scss">
.HomeSecondBanner {
  .sub-title {
    font-size: 18px;
  }
  .header-title {
    font-size: 5vw;
    font-weight: bold;
  }
}
</style>
