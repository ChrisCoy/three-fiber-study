import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("../ProductEnvironment"), {
  ssr: false,
}) as any;

export default () => <DynamicComponentWithNoSSR />;
