/**
 *
 * Express tracing using zipkin & jaeger
 *
 */
import os from "os";
const app_service_name = "auth-service";
import { init } from "@/tracing";
console.log(`tracing-run.ts   ----------   ${app_service_name}`);
init(`${app_service_name}-${os.hostname()}`, "logging-env");
