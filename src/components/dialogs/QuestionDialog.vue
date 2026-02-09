<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
        <q-card :style="{maxWidth: $props.maxWidth ? $props.maxWidth+'px' : '450px', 'min-width': '350px', 'border-radius': '12px !important'}">
            <q-card-section class="row q-py-sm justify-between items-center" :class="`bg-${color}-1 text-${color}-9`">
                <span class="text-h4 text-left">{{ $props.title }} </span>
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="flex">
                <template v-if="typeof $props.icon === 'string'">
                <q-avatar :color="`${color}-1`">
                    <q-icon :name="$props.icon"  :color="`${color}-9`"></q-icon>
                  </q-avatar>
                </template>
                <span class="q-mt-sm q-mx-md text-center text-h6" v-html="$props.message"></span>
            </q-card-section>
            <q-card-actions class="q-pt-none action-buttons" :class="{'reverse': $props.reverseActions}">
                <q-btn v-if="$props.cancel && typeof $props.cancel === 'object'" v-bind="$props.cancel"
                    @click="onDialogCancel" />
                <q-btn v-if="$props.ok && typeof $props.ok === 'object'" v-bind="$props.ok" @click="onDialogOK" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
export interface IQuestionProps extends QDialogOptions {
    title?: string,
    message?: string,
    type?: 'positive' | 'negative' | 'info'
    reverseActions?: boolean,
    icon?: string | boolean,
    maxWidth?: number,
}
</script>

<script lang="ts" setup>
import type { QDialogOptions } from 'quasar';
import  { useDialogPluginComponent } from 'quasar';
import { computed } from 'vue';
const props = defineProps<IQuestionProps>()
defineEmits([...useDialogPluginComponent.emits]);
const {
    dialogRef,
    onDialogHide,
    onDialogCancel,
    onDialogOK
} = useDialogPluginComponent();

const color = computed(() => {
    if(!props.type) return 'cyan'
    const colors = {
        'positive': 'green',
        'negative': 'red',
        'info': 'cyan'
    }

    return colors[props.type]
})

</script>


<style lang="scss" scoped>
.action-buttons {
    display: grid;
    grid-template-columns: auto auto;
    justify-self: end;
    &.reverse {
        direction: rtl;
    }
}
</style>
