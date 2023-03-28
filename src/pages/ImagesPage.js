import React, { useEffect } from 'react';
import ImagePreviewComponent from '../components/images/ImagePreviewComponent';
import NavBar from '../components/NavBar';
import ImagesContainer from '../containers/images/ImagesContainer';
import ImageFavesContainer from '../containers/ImageFavesContainer';

const pixAPI = process.env.REACT_APP_PIX_KEY

function ImagesPage(props) {
    const [imagePreview, setImagePreview] = React.useState({});
    const [trendingImages, setTrendingImages] = React.useState([]);
    const [grayscaleImages, setGrayscaleImages] = React.useState([]);
    const [travelImages, setTravelImages] = React.useState([]);
    const [sportsImages, setSportsImages] = React.useState([]);
    const [industryImages, setIndustryImages] = React.useState([]);
    const [peopleImages, setPeopleImages] = React.useState([]);
    const [userFaves, setUserFaves] = React.useState([]);

    useEffect(() => {
        Promise.all([
            fetch(`https://pixabay.com/api/?key=${pixAPI}&orientation=horizontal&image_type=photo&editors_choice=true`),
            fetch(`https://pixabay.com/api/?key=${pixAPI}&colors=grayscale&orientation=horizontal&image_type=photo&editors_choice=true`),
            fetch(`https://pixabay.com/api/?key=${pixAPI}&category=travel&orientation=horizontal&image_type=photo&editors_choice=true`),
            fetch(`https://pixabay.com/api/?key=${pixAPI}&category=sports&orientation=horizontal&image_type=photo&editors_choice=true`),
            fetch(`https://pixabay.com/api/?key=${pixAPI}&category=industry&orientation=horizontal&image_type=photo&editors_choice=true`),
            fetch(`https://pixabay.com/api/?key=${pixAPI}&category=people&orientation=horizontal&image_type=photo&editors_choice=true`),
        ])
            .then(function (response) {
                return Promise.all(response.map(function (response) {
                    return response.json();
                }));
            })
            .then(data => {
                console.log(data);
                const trending = data[0].hits;
                const grayscale = data[1].hits;
                const travel = data[2].hits;
                const sports = data[3].hits;
                const industry = data[4].hits;
                const people = data[5].hits;

                setTrendingImages(trending);
                setGrayscaleImages(grayscale);
                setTravelImages(travel);
                setSportsImages(sports)
                setIndustryImages(industry);
                setPeopleImages(people);

            })
        if (props.currentUser._id) {
            fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${props.currentUser._id}`)
                .then(resp => resp.json())
                .then(data => {
                    setUserFaves(data.images)
                }
                )
        }
    }, [props.currentUser._id])

    const addToFaves = async (image) => {
        const userId = props.currentUser._id;
        let fetchedUser;
        try {
            const userRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}`);
            fetchedUser = await userRes.json();
        } catch (error) {
            console.log(error);
        }

        const mappedImagesIds = fetchedUser.images.map((userImage) => {
            return userImage.id;
        })

        let updatedUser;

        if (!mappedImagesIds.includes(image.id)) {
            const newImage = {
                image: image
            }

            try {
                const updatedUserRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}/images`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newImage)
                });
                updatedUser = await updatedUserRes.json();
                setUserFaves(updatedUser.images);
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handlePreviewClick = (image) => {
        setImagePreview(image)
    }

    const handleDelete = async (image) => {
        const userId = props.currentUser._id;
        let fetchedUser;
        try {
            const userRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}`);
            fetchedUser = await userRes.json();
        } catch (error) {
            console.log(error);
        }

        const filteredImages = fetchedUser.images.filter((userImages) => {
            return userImages.id !== image.id;
        })

        let updatedUser;

        try {
            const updatedUserRes = await fetch(`https://shy-pink-shark-yoke.cyclic.app/users/${userId}/images`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ images: filteredImages })
            });
            updatedUser = await updatedUserRes.json();
            setUserFaves(updatedUser.images);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="wrapper">
            <NavBar currentUser={props.currentUser} handleLogoutClick={() => props.handleLogout()} />
            <div >
                <div>
                    {Object.keys(imagePreview).length === 0 ? <ImagePreviewComponent image={props.photos[1]} addToFaves={(image) => addToFaves(image)} /> : <ImagePreviewComponent image={imagePreview} addToFaves={(image) => addToFaves(image)} />}
                </div>
                <div className="user-favorites-container">
                    <ImageFavesContainer currentUser={props.currentUser} images={userFaves} handlePreviewClick={handlePreviewClick} handleDelete={handleDelete} />
                </div>
            </div>
            <hr></hr>
            <div className="user-faves-containers">
                <ImagesContainer currentUser={props.currentUser} images={trendingImages} genre={"Trending"} handlePreviewClick={handlePreviewClick} addToFaves={(image) => addToFaves(image)} />
                <ImagesContainer currentUser={props.currentUser} images={grayscaleImages} genre={"Black and White"} handlePreviewClick={handlePreviewClick} addToFaves={(image) => addToFaves(image)} />
                <ImagesContainer currentUser={props.currentUser} images={travelImages} genre={"Travel"} handlePreviewClick={handlePreviewClick} addToFaves={(image) => addToFaves(image)} />
                <ImagesContainer currentUser={props.currentUser} images={sportsImages} genre={"Sports"} handlePreviewClick={handlePreviewClick} addToFaves={(image) => addToFaves(image)} />
                <ImagesContainer currentUser={props.currentUser} images={industryImages} genre={"Industry"} handlePreviewClick={handlePreviewClick} addToFaves={(image) => addToFaves(image)} />
                <ImagesContainer currentUser={props.currentUser} images={peopleImages} genre={"People"} handlePreviewClick={handlePreviewClick} addToFaves={(image) => addToFaves(image)} />
            </div>
        </div>
    )
}

export default ImagesPage