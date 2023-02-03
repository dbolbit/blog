import {FC, useState} from 'react'
import {Button, Modal, Input, Space, Select} from "antd"
import type {SelectProps} from 'antd'


const {TextArea} = Input

const options: SelectProps['options'] = []

const AddPost: FC = (props) => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [titleInput, setTitleInput] = useState<string>('')
  const [tagsInput, setTagsInput] = useState<string>('')
  const [postInput, setPostInput] = useState<string>('')

  const toggleModal = () => setOpen(!open)

  const handleOk = async () => {
    setConfirmLoading(true)
    setConfirmLoading(false)
  }


  return (
    <>
      <Button type="primary" onClick={toggleModal}>Добавить пост</Button>
      <Modal
        width="65%"
        destroyOnClose
        title="Новый пост"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={toggleModal}
      >
        <Space className="new_post_container" direction={"vertical"}>
          <Input
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Тема" required/>
          <Input
            onChange={(e) => setTagsInput(e.target.value)}
            value={tagsInput}

            placeholder="#city #love..."/>
          <TextArea
            maxLength={1000}
            rows={10}
            placeholder="Ваш текст..."
            required
            onChange={(e) => setPostInput(e.target.value)}
            value={postInput}

          />
        </Space>
      </Modal>
    </>
  )
}


export default AddPost