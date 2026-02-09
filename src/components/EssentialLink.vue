<template>
  <q-item :to="$props.to" clickable v-ripple class="border-md-radius button q-mt-sm" active-class="bg-primary text-secondary">
    <q-item-section avatar>
      <q-icon :name="$props.icon"></q-icon>
    </q-item-section>
    <q-item-section>{{ $props.title }}</q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  icon?: string;
  to?: string;
};

withDefaults(defineProps<EssentialLinkProps>(), {
  link: '#',
  icon: '',
});
</script>
