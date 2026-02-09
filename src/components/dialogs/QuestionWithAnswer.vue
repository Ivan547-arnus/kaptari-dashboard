<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
        <q-card style="max-width: 420px" class="full-width">
            <q-card-section class="row q-py-sm justify-between items-center" :class="`bg-${color}-1 text-${color}-9`">
                <span class="text-h4 col-12 text-center">{{ $props.title }} </span>
            </q-card-section>
            <q-card-section class="column items-center">
                <q-icon v-if="$props.icon" :name="$props.icon" size="3em" :color="`${color}-9`"></q-icon>
                <template v-else>
                    <q-icon v-if="$props.type === 'info'" name="o_flag" size="3em" :color="`${color}-9`"></q-icon>
                    <q-icon v-else-if="$props.type === 'positive'" name="o_check_circle" size="3em"
                        :color="`${color}-9`"></q-icon>
                    <q-icon v-else-if="$props.type === 'negative'" name="o_report" size="3em"
                        :color="`${color}-9`"></q-icon>
                </template>
                <span class="q-mt-sm q-mx-md text-center">{{ $props.message }}</span>
                <q-form class="full-width q-mt-md" id="answer-form" @submit="onDialogOK(model)">
                   <q-input
                        v-bind="{ ...$theme.input, ...$props.input as Object }"
                        v-model="model"
                        autogrow
                    />
                </q-form>
            </q-card-section>
            <q-card-section class="q-pt-none action-buttons" :class="{'reverse': $props.reverseActions}">
                <q-btn v-if="$props.cancel && typeof $props.cancel === 'object'" v-bind="$props.cancel"
                    @click="onDialogCancel" />
                <q-btn
                  v-if="$props.ok && typeof $props.ok === 'object'"
                  v-bind="$props.ok"
                  type="submit"
                  form="answer-form" />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
export interface IQuestionWithAnswerProps extends QDialogOptions {
    title?: string,
    message?: string,
    type?: 'positive' | 'negative' | 'info'
    reverseActions?: boolean,
    icon?: string,
    input?: Omit<QInputProps, 'modelValue'>
    value?: string | null
}
</script>

<script lang="ts" setup>
import type { QDialogOptions, QInputProps } from 'quasar';
import { useDialogPluginComponent } from 'quasar';
import { computed, onMounted, ref } from 'vue';
const props = defineProps<IQuestionWithAnswerProps>()
defineEmits([...useDialogPluginComponent.emits]);
const {
    dialogRef,
    onDialogHide,
    onDialogCancel,
    onDialogOK,
} = useDialogPluginComponent();
const model = ref<string | null>(null)
const color = computed(() => {
    if(!props.type) return 'cyan'
    const colors = {
        'positive': 'green',
        'negative': 'red',
        'info': 'cyan'
    }

    return colors[props.type]
})

onMounted(() => {
    if(props.value) model.value = props.value
    else model.value = null
})
</script>


<style lang="scss" scoped>
.action-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1em;

    &.reverse {
        direction: rtl;
    }
}
</style>
