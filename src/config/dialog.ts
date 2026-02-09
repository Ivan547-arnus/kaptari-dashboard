import { Dialog } from 'quasar';
import { theme } from 'src/boot/helpers';
import type {
    IQuestionProps,
} from 'src/components/dialogs/QuestionDialog.vue';
import QuestionDialog from 'src/components/dialogs/QuestionDialog.vue';
import type { IQuestionWithAnswerProps } from 'src/components/dialogs/QuestionWithAnswer.vue';
import QuestionWithAnswer from 'src/components/dialogs/QuestionWithAnswer.vue';

export const question = (
    title: string,
    message?: string,
    config?: IQuestionProps,
): Promise<boolean> => {
    return new Promise((resolve) => {
        Dialog.create({
            componentProps: {
                title,
                message,
                type: 'info',
                icon: 'bi-question-circle',
                ok: {
                    ...theme.btn,
                    label: 'Aceptar',
                    color: 'primary',
                },
                cancel: {
                    ...theme.btn,
                    label: 'Cancelar',
                },
                ...config,
            },
            component: QuestionDialog,
        })
            .onOk(() => {
                resolve(true);
            })
            .onCancel(() => {
                resolve(false);
            });
    });
};

export const questionWithAnswer = (
    title: string,
    message?: string,
    config?: IQuestionWithAnswerProps,
): Promise<{ answer: boolean; value: string | null }> => {
    return new Promise((resolve) => {
        Dialog.create({
            componentProps: {
                title,
                message,
                type: 'info',
                icon: 'o_flag',
                ok: {
                    ...theme.btn,
                    label: 'Aceptar',
                    color: 'primary',
                    class: 'full-width rounded-button',
                },
                cancel: {
                    ...theme.btn,
                    label: 'Cancelar',
                    color: 'primary',
                    class: 'col rounded-button',
                },
                ...config,
            },
            component: QuestionWithAnswer,
        })
            .onOk((answer) => {
                resolve({ answer: true, value: answer });
            })
            .onCancel(() => {
                resolve({ answer: false, value: null });
            });
    });
};

export const alert = (
    title: string,
    message?: string,
    config?: IQuestionProps,
): Promise<boolean> => {
    return new Promise((resolve) => {
        const iconOpts = {
            'positive': 'bi-check-circle',
            'negative': 'bi-exclamation-circle',
            'info': 'bi-info-circle',
        }

        Dialog.create({
            componentProps: {
                title,
                message,
                type: 'info',
                icon: iconOpts[config?.type || 'info'],
                ok: {
                    ...theme.btn,
                    label: 'Aceptar',
                    color: config?.type || 'primary',
                    class: 'full-width rounded-button',
                },
                cancel: false,
                ...config,
            },
            component: QuestionDialog,
        })
            .onOk(() => {
                resolve(true);
            })
            .onCancel(() => {
                resolve(false);
            });
    });
};
