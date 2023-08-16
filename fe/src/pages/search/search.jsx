import './search.css'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { getAllComic,getRankingBoard,getFollowedComic } from "../../api/comic"
import { useEffect, useState } from 'react';
import { ComicSection } from '../../components/comic/comic';

export default function Search() {
    return (
        <div className="search-container">
            <div className="search-body">
                
            </div>
        </div>
    )
}