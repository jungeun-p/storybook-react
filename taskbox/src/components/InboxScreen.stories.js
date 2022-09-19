import { Provider } from "react-redux";
import store from "../lib/store";
import InboxScreen from "./InboxScreen";

export default {
    component: InboxScreen,
    title: "InboxScreen",
    decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};

const Template = () => <InboxScreen />;

export const Default = Template.blind({});
export const Error = Template.blind({});