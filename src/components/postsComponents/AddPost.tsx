import {FC, useState} from 'react'
import {Button, Modal, Input, Space, message} from "antd"
import {useAppDispatch, useAppSelector} from "../../hooks/useCustomRTKSelectors"
import {addPost} from "../../store/slices/postsSlice"


const {TextArea} = Input


const AddPost: FC = (props) => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [title, setTitle] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const id = useAppSelector(state => state.user.id)
  const dispatch = useAppDispatch()
  const toggleModal = () => setOpen(!open)
  const [messageApi, contextHolder] = message.useMessage()

  const handleOk = async () => {
    setConfirmLoading(true)
    try {
      const response = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, body, userId: id, tags: tags.split(' '),})
      })
      const result = await response.json()
      dispatch(addPost(result))
      setConfirmLoading(false)
      setOpen(false)
      messageApi.info('Пост успешно опубликован!')
    } catch (e) {
      console.log(e)
      setConfirmLoading(false)
    }

  }
  const handlerClose = () => {
    setTitle('')
    setTags('')
    setBody('')
  }

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={toggleModal}>Добавить пост</Button>
      <Modal
        afterClose={handlerClose}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Тема" required/>
          <Input
            onChange={(e) => setTags(e.target.value)}
            value={tags}

            placeholder="#city #love..."/>
          <TextArea
            maxLength={1000}
            rows={10}
            placeholder="Ваш текст..."
            required
            onChange={(e) => setBody(e.target.value)}
            value={body}

          />
        </Space>
      </Modal>
    </>
  )
}


export default AddPost