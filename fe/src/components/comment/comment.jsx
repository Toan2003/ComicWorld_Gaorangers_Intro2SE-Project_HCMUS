import './comment.css';
import { AiOutlineWarning } from 'react-icons/ai'
// import { MdArrowBackIos } from 'react-icons/md'

export function CommentSection({ commentList }) {

    return (
        <div className="comment-container">
            <h3 className="comment-section_name">Bình luận</h3>
            
            <div className="comment-self">
                <textarea rows="2" placeholder="Nhập bình luận của bạn vào đây" className="comment-self-box" />
                <button className="comment-self-btn">Gửi</button>
            </div>

            <div className="comment-view">
                {
                    commentList ?
                    (commentList.map((cur, index) => <Comment props={cur} key={index}></Comment>))
                    : null
                }
            </div>
        </div>
    )
}

function Comment({ props }) {
    function handleReport(id) {
        console.log(id)
    }

    return (
        <div className="comment-wrap">
            <div className="comment-content-wrap">
                <span className="comment-username-wrap">
                    <h3 className="comment-username">{props.username}</h3>
                    <button onClick={() => handleReport(props._id)} className="comment-report"><AiOutlineWarning className="comment-report-icon" />Báo cáo</button>
                </span>
                <pre className="comment-content">{props.content}</pre>
            </div>
        </div>
    )
}