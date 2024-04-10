import { Form, Input, Progress } from "antd";
import { useData } from "./context";

export const Create = () => {
	const { save, total, checkedLength } = useData();
    const [form] = Form.useForm()
	return (
		<div className="flex items-center gap-4">
			<Progress type="circle" strokeLinecap="butt" size={28} showInfo={false} strokeColor={"#16182E"} percent={(checkedLength / total) * 100} />
			<Form
				className="flex-1"
                form={form}
				onFinish={(values) => {
					save(values.value);
                    form.resetFields()
				}}
			>
				<Form.Item noStyle name={"value"} rules={[{ required: true }]}>
					<Input placeholder="今天想要做什么？" />
				</Form.Item>
			</Form>
		</div>
	);
};
