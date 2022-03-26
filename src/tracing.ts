// "use strict";

import {
  BasicTracerProvider,
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
} from "@opentelemetry/tracing";

import { CollectorTraceExporter } from "@opentelemetry/exporter-collector";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { JaegerExporter } from "@opentelemetry/exporter-jaeger";
import { ZipkinExporter } from "@opentelemetry/exporter-zipkin";
import { NodeTracerProvider } from "@opentelemetry/node";
import { OTTracePropagator } from "@opentelemetry/propagator-ot-trace";
import { MeterProvider } from "@opentelemetry/sdk-metrics-base";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";

const hostName = "jaeger";
const hostNameZipkin = "zipkin";
const hostNamePrometheus = "prometheus";

const init = (serviceName: string, environment: string) => {
  const optionsJaeger = {
    tags: [],
    endpoint: `http://${hostName}:14268/api/traces`,
  };
  const optionsZipkin = {
    url: `http://${hostNameZipkin}:9411/api/v2/spans`,
    serviceName: serviceName,
  };
  const exporterConsole = new ConsoleSpanExporter();
  const exporterJaeger = new JaegerExporter(optionsJaeger);
  const exporterZipkin = new ZipkinExporter(optionsZipkin);

  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName, // Service name that showuld be listed in jaeger ui
      [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: environment,
    }),
  });

  // Enable to see the spans printed in the console by the ConsoleSpanExporter
  provider.addSpanProcessor(new SimpleSpanProcessor(exporterConsole));
  provider.addSpanProcessor(new SimpleSpanProcessor(exporterJaeger));
  provider.addSpanProcessor(new SimpleSpanProcessor(exporterZipkin));

  // Use the BatchSpanProcessor to export spans in batches in order to more efficiently use resources.
  // provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  provider.register({ propagator: new OTTracePropagator() });

  console.log("tracing initialized");

  registerInstrumentations({
    instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
  });

  const tracer = provider.getTracer(serviceName);
  return { tracer };
};

const initNew = function (serviceName: string, metricPort: number) {
  // Define metrics
  const metricExporter = new PrometheusExporter({ port: metricPort }, () => {
    console.log(
      `${process.pid} - scrape: http://${hostNamePrometheus}:${metricPort}${PrometheusExporter.DEFAULT_OPTIONS.endpoint}`
    );
  });
  const meter = new MeterProvider({
    exporter: metricExporter,
    interval: 1000,
  }).getMeter(serviceName);

  // Define traces
  const exporterConsole = new ConsoleSpanExporter();
  const exporterJaeger = new JaegerExporter({
    endpoint: `http://${hostName}:14268/api/traces`,
  });
  const exporterZipkin = new ZipkinExporter({
    url: `http://${hostNameZipkin}:9411/api/v2/spans`,
    serviceName: serviceName,
  });
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(exporterConsole));
  // provider.addSpanProcessor(new SimpleSpanProcessor(exporterJaeger));
  // provider.addSpanProcessor(new SimpleSpanProcessor(exporterZipkin));
  provider.register();
  registerInstrumentations({
    instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
  });
  const tracer = provider.getTracer(serviceName);
  console.log(`tracing initialized `);
  console.log(`tracing service name -- ${serviceName}`);
  return { meter, tracer };
};

export { init, initNew };
