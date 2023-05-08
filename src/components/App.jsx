// import { Component } from 'react';
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { GlobalStyle } from "./GlobalStyle";
import  toast, { Toaster } from 'react-hot-toast';
import { AppStyled } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../api/imageApi';
import {Loader} from './Loader/Loader'
import { Modal } from './Modal/Modal';


export function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (searchQuery && page) {
      setIsLoading(true);
      fetchImages(searchQuery, page)
        .then(({ hits, totalHits }) => {
          if (!totalHits) {
            toast.error('There are no images for your request');
            return;
          }
          const results = hits.map(
            ({ tags, id, webformatURL, largeImageURL }) => ({
              tags,
              id,
              smallImage: webformatURL,
              largeImage: largeImageURL,
            })
          );
          setImages((prevImages) => [...prevImages, ...results]);
          setTotalHits(totalHits);
        })
        .catch(error => {
          toast.error('There are no images for your request');
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchQuery, page]);

  const submitHandler = (query) => {
    if (query === searchQuery) {
      return (toast(' That was images for your request')) 
    }
    window.scrollTo({ behavior: 'smooth', top: 0 });
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setTotalHits(0);
  };

  const onLoadMoreButton = () => {
    setPage(page + 1);
  };

  const onImageClick = (image) => {
    setActiveImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setActiveImage(null);
    setShowModal(false);
  };

  return (
    <AppStyled>
      <SearchBar onSubmit={submitHandler} />
      <ImageGallery images={images} openModal={onImageClick} />
      {totalHits > images.length && !isLoading && (
        <Button onLoadMoreButton={onLoadMoreButton} />
      )}
      {isLoading && <Loader/>}
      {showModal && activeImage && (
        <Modal image={activeImage} onClose={closeModal}></Modal>
      )}
      <Toaster position="top-center" reverseOrder={false}/>
      <GlobalStyle/>
    </AppStyled>
  );
}



