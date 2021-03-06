import { Button, DatePicker, Form, Input, Radio, Typography } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const { Text } = Typography;

interface UserFormProps extends FormComponentProps {
  addData: (student: object) => void;
  handleOk: () => void;
}

class UserForm extends React.Component<UserFormProps, any> {
  state = {
    valueRadio: "",
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const student = {
          id: uuidv4(),
          fullname: values.fullname,
          birthday: values.birthday._d.toLocaleDateString(),
          gender: values.gender,
          email: values.email,
          phone: `${values.prefix}${values.phone}`,
          address: values.address,
        };

        this.props.addData(student);
        this.props.handleOk();
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 4,
          offset: 20,
        },
      },
    };

    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "84",
    })(<Text>+84 </Text>);
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Họ và tên" labelAlign="left">
          {getFieldDecorator("fullname", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Ngày sinh" labelAlign="left">
          {getFieldDecorator("birthday", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ],
          })(<DatePicker placeholder="Chọn ngày" style={{ width: "100%" }} />)}
        </Form.Item>
        <Form.Item label="Giới tính" labelAlign="left">
          {getFieldDecorator("gender", {
            rules: [
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ],
          })(
            <Radio.Group
              onChange={(e) => this.setState({ valueRadio: e.target.value })}
              value={this.state.valueRadio}
            >
              <Radio value={"Nam"}>Nam</Radio>
              <Radio value={"Nữ"}>Nữ</Radio>
              <Radio value={"Khác"}>Khác</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="E-mail" labelAlign="left">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng E-mail!",
              },
              {
                required: true,
                message: "Vui lòng nhập trường này!",
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Số điện thoại" labelAlign="left">
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Vui lòng nhập trường này!" },
              { len: 9, message: "Vui lòng nhập đúng số điện thoại!" },
            ],
          })(
            <Input
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
              type="number"
            />
          )}
        </Form.Item>
        <Form.Item label="Địa chỉ" labelAlign="left">
          {getFieldDecorator("address", {
            rules: [{ required: true, message: "Vui lòng nhập trường này!" }],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" block>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const AddForm = Form.create<UserFormProps>({})(UserForm);

export default AddForm;
