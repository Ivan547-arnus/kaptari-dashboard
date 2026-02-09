<template>
  <div class="fullscreen bg-accent text-primary text-center q-pa-md flex flex-center">
    <div>
      <div>
        <q-img no-spinner src="~assets/logo.webp" fit="contain" class="border-md-radius" style="width: 60px;"></q-img>
      </div>
      <div class="text-h2">
        404
      </div>

      <div class="text-h6">
        Oops. No hay nada aquí...
      </div>

      <q-btn
        color="primary"
        text-color="accent"
        push
        to="/"
        label="Volver al inicio"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
