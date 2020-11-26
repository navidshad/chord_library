import eventBus from './event-bus';

function toast(option: { label: string, description?: string, type?: string }) {
    eventBus.fire('toast', option);
}

export default {
    toast,
}