import './comment.css';
import { AiOutlineWarning } from 'react-icons/ai'
import { MdArrowBackIos } from 'react-icons/md'

export function CommentSection() {
    const commentList = [
        {
            name: 'Trư Bát Giới',
            avatar : 'https://st.gamevui.com/images/image/2019/02/20/tay-du-ky-tru-bat-gioi.jpg',
            content: 'Anh này có thật ngoài đời không vậy ? \nsao mà anh siêu vậy? \nanh đến từ hành tinh nào?'
        },
        {
            name: 'Trư Bát Giới',
            avatar : 'https://st.gamevui.com/images/image/2019/02/20/tay-du-ky-tru-bat-gioi.jpg',
            content: 'ngưỡng mộ quá'
        },
        {
            name: 'Trư Bát Giới',
            avatar : 'https://st.gamevui.com/images/image/2019/02/20/tay-du-ky-tru-bat-gioi.jpg',
            content: 'ghê vậy sao'
        },
        {
            name: 'Trư Bát Giới',
            avatar : 'https://st.gamevui.com/images/image/2019/02/20/tay-du-ky-tru-bat-gioi.jpg',
            content: 'hahaha'
        }
    ]

    return (
        <div className="comment-container">
            <h3 className="comment-section_name">Bình luận</h3>
            
            <div className="comment-self">
                <textarea rows="2" placeholder="Nhập bình luận của bạn vào đây" className="comment-self-box" />
                <button className="comment-self-btn">Gửi</button>
            </div>

            <div className="comment-view">
                {
                    commentList.length > 0 ?
                    (commentList.map((cur, index) => <Comment props={cur} key={index}></Comment>))
                    : null
                }
            </div>
        </div>
    )
}

function Comment({ props }) {
    return (
        <div className="comment-wrap">
            <img src={props.avatar} alt="" className="comment-avatar" />
            <div className="comment-content-wrap">
                <MdArrowBackIos className="comment-content-arrow" />
                <span className="comment-username-wrap">
                    <h3 className="comment-username">{props.name}</h3>
                    <button className="comment-report"><AiOutlineWarning className="comment-report-icon" />Báo cáo</button>
                </span>
                <pre className="comment-content">{props.content}</pre>
            </div>
        </div>
    )
}