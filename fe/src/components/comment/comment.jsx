import './comment.css';
import { AiOutlineWarning } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { postAddComment } from '../../api/comic';

export function CommentSection({ comic, userId, comicId }) {
    const [inputText, setInputText] = useState("")
    const [disabled, setDisabled] = useState(false)
    const [placeholder, setPlaceholder] = useState("Nhập bình luận của bạn vào đây")
    
    async function handleSendComment(e) {
        e.preventDefault()
        if (inputText.length != '') {
            await postAddComment(comicId, userId, inputText)
        }
        setInputText("")
    }

    function checkLogin() {
        if (userId && userId !== 'null') {
            setDisabled(false)
        }
        else {
            setDisabled(true)
            setPlaceholder("Vui lòng đăng nhập hoặc đăng kí để bình luận")
        }
    }

    useEffect(() => checkLogin(),[])

    return (
        <div className="comment-container">
            <h3 className="comment-section_name">Bình luận</h3>
            
            <form className="comment-self" onSubmit={(e) => handleSendComment(e)}>
                <textarea type="text" value={inputText} onChange={(e) => (setInputText(e.target.value))} placeholder={placeholder} rows="2" className="comment-self-box" />
                <button disabled={disabled} type="submit" className="comment-self-btn">Gửi</button>
            </form>

            <div className="comment-view">
                {
                    comic.Comments ?
                    (comic.Comments.map((cur, index) => <Comment props={cur} idComic={comic._id} key={index}></Comment>))
                    : null
                }
            </div>
        </div>
    )
}

function Comment({ props, idComic }) {
    function handleReport(userId, comicId) {
        console.log(userId)
        console.log(comicId)
    }

    return (
        <div className="comment-wrap">
            <div className="comment-content-wrap">
                <span className="comment-username-wrap">
                    <h3 className="comment-username">{props.username}</h3>
                    <button onClick={() => handleReport(props._id, idComic)} className="comment-report"><AiOutlineWarning className="comment-report-icon" />Báo cáo</button>
                </span>
                <pre className="comment-content">{props.content}</pre>
            </div>
        </div>
    )
}