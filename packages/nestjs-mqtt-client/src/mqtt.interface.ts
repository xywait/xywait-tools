import { IClientOptions, Packet } from 'mqtt';
import { LoggerService, Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export type MqttMessageTransformer = (payload: Buffer) => any;

export type LoggerConstructor = new (...params) => LoggerService;

// 订阅参数
export interface MqttSubscribeOptions {
    topic: string | string[];
    queue?: boolean;
    share?: string;
    transform?: 'json' | 'text' | MqttMessageTransformer;
}

export interface MqttSubscriberParameter {
    index: number;
    type: 'payload' | 'topic' | 'packet' | 'params';
    transform?: 'json' | 'text' | MqttMessageTransformer;
}

export interface MqttSubscriber {
    topic: string;
    handle: any;
    route: string;
    provider: any;
    regexp: RegExp;
    options: MqttSubscribeOptions;
    parameters: MqttSubscriberParameter[];
}

export interface MqttLoggerOptions {
    useValue?: LoggerService;
    useClass?: Type<LoggerService>;
}

/**
 * mqtt连接配置参数
 * port
 * host
 * hostname
 * path
 * protocol
 * wsOptions
 * keepalive: 是以秒为单位的时间间隔,客户端从发送完成一个控制包到开始发送下一个的最大时间间隔
 * clientId: 客户端标识
 * protocolId
 * protocolVersion
 * clean
 * reconnectPeriod
 * connectTimeout
 * username
 * password
 * incomingStore
 * outgoingStore
 * queueQoSZero
 * reschedulePings
 * servers
 * resubscribe
 * will:{
 *  topic
 *  payload
 *  qos: 发布Will Message时使用QoS的等级
 *  retain: Will Message在发布之后是否需要保留
 *  properties:{
 *      willDelayInterval
 *      payloadFormatIndicator
 *      messageExpiryInterval
 *      contentType
 *      responseTopic
 *      correlationData
 *      userProperties
 *  }
 *  transformWsUrl
 *  properties
 *  messageIdProvider
 * }
 * key
 * cert
 * ca
 * rejectUnauthorized
 */
export interface MqttModuleOptions extends IClientOptions {
    queue?: boolean;
    share?: string;
    logger?: MqttLoggerOptions;
    beforeHandle?: (topic: string, payload: Buffer, packet: Packet) => any;
}

export interface MqttOptionsFactory {
    createMqttConnectOptions(): Promise<MqttModuleOptions> | MqttModuleOptions;
}

export interface MqttModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useExisting?: Type<MqttOptionsFactory>;
    useClass?: Type<MqttOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<MqttModuleOptions> | MqttModuleOptions;
    logger?: MqttLoggerOptions;
}
