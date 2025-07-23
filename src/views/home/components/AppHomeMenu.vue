<template>
  <div>
    <RouterLink to="/processes">
      <AppButton variant="info" style="height: 90px; width: 300px">
        <h6><AppIcon style="height: 50px; width: 50px" name="fc-document" /></h6>
        <b>İşlemler</b>
      </AppButton>
    </RouterLink>
  </div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import AppIcon from '@/components/AppIcon.vue'
</script>
