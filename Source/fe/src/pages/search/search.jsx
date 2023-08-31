import './search.css'
import { useLocation } from 'react-router-dom'
import { ComicSection } from '../../components/comic/comic';
import { getSearhComic } from '../../api/comic';
import { useEffect, useState } from 'react';

export default function Search() {
    function useQuery() {
        return new URLSearchParams(useLocation().search)
    };

    let query = useQuery();
    let keyword = query.get("key")

    const [result, setResult] =  useState([])

    async function loadDataPage() { 
        const returnResult = await getSearhComic(keyword);
        setResult(returnResult?.data?.data?.listComic);
    }
    
    useEffect(() => {
        loadDataPage();
    }, [keyword])

    return (
        <div className="search-container">
            <div className="search-body">
                {
                    result.length > 0 ?
                    (
                        <ComicSection title={"Kết quả tìm kiếm cho: " + keyword} data={result}></ComicSection>
                        
                    )
                    :
                    (
                        <>
                            <h3 className="section-title">{"Kết quả tìm kiếm cho: " + keyword}</h3>
                            <div className="search-no_result">Không tìm thấy kết quả có chứa từ khóa của bạn</div>
                        </>
                    )
                }
            </div>
        </div>
    )
}