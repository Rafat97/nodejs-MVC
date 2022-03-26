import { APP_SERVICE_NAME } from "@/bootstrap/appInfo";
import { initNew } from "@/tracing";

const tracingCall = () => {
  const { meter, tracer } = initNew(APP_SERVICE_NAME, 8081);
  return { meter, tracer };
};

export default tracingCall;