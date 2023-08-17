import './search.css'
import { useLocation } from 'react-router-dom'
import { ComicSection } from '../../components/comic/comic';

export default function Search() {
    function useQuery() {
        return new URLSearchParams(useLocation().search)
    };

    let query = useQuery();
    let keyword = query.get("key")

    return (
        <div className="search-container">
            <div className="search-body">
                <ComicSection title={"Kết quả tìm kiếm cho: " + keyword}></ComicSection>
                {/* <div className="search-no_result">Không tìm thấy kết quả có chứa từ khóa của bạn</div> */}
            </div>
        </div>
    )
}