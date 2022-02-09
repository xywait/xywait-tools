// 定义message的解析方式

import { MqttMessageTransformer } from './mqtt.interface';

export const JsonTransform: MqttMessageTransformer = payload => {
    return JSON.parse(payload.toString('utf-8'));
};

export const TextTransform: MqttMessageTransformer = payload => {
    return payload.toString('utf-8');
};

export function getTransform(transform: 'json' | 'text' | MqttMessageTransformer ) {
    if (typeof transform === 'function') {
       return transform;
    } else {
        if (transform === 'text') {
            return TextTransform;
        } else {
            return JsonTransform;
        }
    }
};
