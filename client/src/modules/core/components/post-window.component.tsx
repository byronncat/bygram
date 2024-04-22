import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import {
  useGlobalContext,
  useStorageContext,
  toast,
  Overlay,
  ReactProps,
} from '@global'
import Menu from './menu.component'
import { UploadPostWindow } from '../components'
import {
  getComments,
  sendComment,
  likePost,
  deleteComment,
} from '../services/post.service'
import { AUTHOR_POST_MENU, DEFAULT_AVATAR } from '../constants'
import { CommentData, File, PostData } from '../types'
import homeStyles from '../styles/pages/home.module.sass'
import styles from '../styles/components/post-window.module.sass'

interface PostWindowProps extends ReactProps {
  post: PostData
  onExit: () => void
}
export default function PostWindow({ post, onExit }: PostWindowProps) {
  const [comment, setComment] = useState({} as CommentData)
  const [comments, setComments] = useState([] as CommentData[])
  const { refreshPage } = useGlobalContext()
  const { authenticationToken: authenticationStorage, activeLinkHandler } =
    useStorageContext()
  const [showActionMenu, setShowActionMenu] = useState(false)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showCommentMenu, setShowCommentMenu] = useState(false)
  const [likes, setLikes] = useState(post.likes)

  useEffect(() => {
    ;(async () => {
      const response = await getComments(post.id)
      if (response.success && response.data) setComments(response.data)
      else toast.display(response.message, 'error')
    })()
  }, [post, refreshPage])

  const authorMenu = AUTHOR_POST_MENU.map((item) => {
    switch (item.name) {
      case 'Delete post': {
        item.functionHandler = async () => {
          setShowActionMenu(false)
          onExit()
          const response = await item.function!(post.id)
          toast.display(response.message, response.success && 'error')
          refreshPage()
        }
        break
      }
      case 'Edit': {
        item.functionHandler = () => {
          setShowActionMenu(false)
          setShowCreatePost(true)
        }
        break
      }
    }
    return item
  })
  authorMenu.push({
    name: 'Cancel',
    functionHandler: () => {
      setShowActionMenu(false)
    },
  })

  const onComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const commentValue = (event.target as HTMLFormElement).comment.value
    if (!commentValue) return toast.display('Comment cannot be empty', 'error')
    const response = await sendComment(
      authenticationStorage.identity!.id,
      post.id,
      commentValue
    )
    if (response.success) {
      form.reset()
      refreshPage()
      toast.display(response.message, 'success')
    }
  }

  const commentMenu = [
    {
      name: 'Delete comment',
      functionHandler: async () => {
        setShowCommentMenu(false)
        const response = await deleteComment(post.id, comment.id)
        if (response.success) refreshPage()
        toast.display(response.message, response.success ? 'success' : 'error')
      },
    },
    {
      name: 'Cancel',
      functionHandler: () => {
        setShowCommentMenu(false)
      },
    },
  ]

  return (
    <>
      {showCreatePost && (
        <UploadPostWindow
          defaultPost={post}
          zIndex={3}
          onExit={() => {
            setShowCreatePost(false)
            onExit()
          }}
          method="put"
        />
      )}
      {showActionMenu && authenticationStorage.identity!.id === post.uid && (
        <Overlay zIndex={2} exitHandler={() => setShowActionMenu(false)}>
          <Menu list={authorMenu} />
        </Overlay>
      )}
      <Overlay exitHandler={() => onExit()}>
        <div className={clsx(styles['wrapper'], 'mw-100', 'd-flex')}>
          <ImageContent file={post.file} />
          <div
            className={clsx(
              styles['post-content-wrapper'],
              'd-flex flex-column p-3',
              'position-relative'
            )}
          >
            {authenticationStorage.identity?.id === post.uid && (
              <span
                className={clsx(
                  'position-absolute top-0 end-0',
                  'p-3',
                  'fs-3',
                  'pe-auto'
                )}
                role="button"
                onClick={() => {
                  setShowActionMenu(true)
                }}
              >
                <i className="icon-ellipsis"></i>
              </span>
            )}

            <Link
              to={`/profile/${post.uid}`}
              className={clsx(styles.link, 'd-flex align-items-center')}
              onClick={() => activeLinkHandler('profile')}
            >
              <Avatar file={post.avatar} />
              <p className="d-inline-block m-0">{post.username}</p>
            </Link>

            <span className={clsx(styles.divider, 'my-3')} />

            <div
              className={clsx(
                styles['comments-zone'],
                'flex-fill p-3 pt-0',
                'overflow-y-scroll overflow-x-hidden'
              )}
            >
              <div className={clsx('w-100')}>
                <span className={(styles['post-info-content'], 'pb-3 d-block')}>
                  {post.content}
                </span>
                <div>
                  {comments.map((comment, index) => (
                    <div key={index} className="d-flex align-items-center my-2">
                      <Avatar file={comment.avatar} />
                      <p className="m-0">
                        <span>
                          <Link
                            to={`/profile/${comment.uid}`}
                            className={clsx(
                              styles.link,
                              'd-inline-block me-2',
                              'fw-bold'
                            )}
                            onClick={() => activeLinkHandler('profile')}
                          >
                            {comment.username}
                          </Link>
                          {comment.content}
                        </span>
                      </p>
                      {authenticationStorage.identity?.id === post.uid && (
                        <span
                          className={clsx(
                            'ms-auto px-3',
                            'fs-5',
                            'cursor-pointer opacity-50'
                          )}
                          role="button"
                          onClick={() => {
                            setComment(comment)
                            setShowCommentMenu(true)
                          }}
                        >
                          <i className="icon-ellipsis"></i>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <span className={clsx(styles.divider, 'my-3')} />

            <div className={clsx(styles.footer, 'd-flex flex-column')}>
              <div className="d-flex align-items-center">
                <span
                  className={clsx(
                    homeStyles.icons,
                    'd-flex align-items-center'
                  )}
                >
                  <i
                    onClick={async () => {
                      const response = await likePost(
                        authenticationStorage.identity!.id,
                        post.id
                      )
                      if (response.success) {
                        if (
                          likes?.includes(authenticationStorage.identity?.id!)
                        ) {
                          setLikes(
                            likes?.filter(
                              (id) => id !== authenticationStorage.identity?.id
                            )
                          )
                        }
                        if (
                          !likes?.includes(authenticationStorage.identity?.id!)
                        ) {
                          setLikes([
                            ...likes!,
                            authenticationStorage.identity?.id!,
                          ])
                        }
                        refreshPage()
                      }
                    }}
                    className={clsx(
                      homeStyles['likes-icon'],
                      `icon-heart${
                        likes?.includes(authenticationStorage.identity?.id!)
                          ? ''
                          : '-empty'
                      }`,
                      'fs-4',
                      'me-3'
                    )}
                  />
                </span>
                <span className="fw-bold">{likes?.length} likes</span>
              </div>
              <span className={clsx(styles.divider, 'my-3')} />

              <form
                onSubmit={onComment}
                className="d-flex justify-content-between align-items-center"
              >
                <textarea
                  name="comment"
                  className={clsx(styles['comment-box'], 'flex-fill')}
                  placeholder="Add a comment..."
                  rows={1}
                  spellCheck={false}
                />
                <button
                  type="submit"
                  className={clsx(styles['submit-btn'], 'ms-3 px-2 py-1')}
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </Overlay>
      {showCommentMenu &&
        authenticationStorage.identity!.id === comment.uid && (
          <Overlay zIndex={2} exitHandler={() => setShowCommentMenu(false)}>
            <Menu list={commentMenu} />
          </Overlay>
        )}
    </>
  )
}

function ImageContent({ file }: { file: File }) {
  return (
    <div
      className={clsx(
        styles['post-image'],
        'h-100 mw-50',
        'd-flex justify-content-center align-items-center'
      )}
    >
      <img
        src={file?.dataURL}
        alt="post"
        className={clsx(
          file?.sizeType === 'landscape' ? 'w-100 h-auto' : 'w-auto h-100',
          'mw-100 mh-100'
        )}
      />
    </div>
  )
}

function Avatar({ file }: { file: File | undefined }) {
  return (
    <span
      className={clsx(
        styles.avatar,
        'd-flex justify-content-center align-items-center align-self-start',
        'p-0 me-3 rounded-circle',
        'position-relative overflow-hidden'
      )}
    >
      <img
        className={
          file?.sizeType === 'portrait' ? 'w-100 h-auto' : 'w-auto h-100'
        }
        src={file?.dataURL || DEFAULT_AVATAR}
        alt="profile"
      />
    </span>
  )
}
