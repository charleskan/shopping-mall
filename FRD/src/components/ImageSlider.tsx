import { useState } from 'react'
import { dataSlider } from './DataSlider'
import Slides from '../styles/Slide.module.css'

// export function ImageSlider() {
// const[CurrentIndex,setCurrentIndex] =useState(0);
// const length = dataSlider.length

// const goToPrevious = () =>{
//     const isFirstSlide = CurrentIndex === 0
//     const newIndex = isFirstSlide ? dataSlider.length-1 : CurrentIndex-1;
//     setCurrentIndex(newIndex)
//     console.log("next");
// }

// const goToNext = () =>{
//     const isLastSlide = CurrentIndex === dataSlider.length-1
//     const newIndex = isLastSlide ? 0 : CurrentIndex+1;
//     setCurrentIndex(newIndex)
//     console.log("Back");

// }

// 	return (

// <div className={Slides.slideBox}>
//     <div className={Slides.left} onClick={goToPrevious}>《</div>

//     <div className={Slides.right}  onClick={goToNext}>》</div>
//     {dataSlider.map((AS)=>{

//                     <div className={Slides.slide} >

//                         <img  src={dataSlider.image}/>

//                     </div>

//             })}

//         </div>

// 	)
// }

const ImageSlider = ({slides} :{slides:any}) => {
	const [current, setCurrent] = useState(0)
	const length = slides.length

    const nextBanner = () =>{
setCurrent(current === length -1 ?0 :current +1)
    }

    console.log(current);

    const backBanner = () =>{
        setCurrent(current === 0? length-1 :current -1)
            }
    

if(!Array.isArray(slides)|| slides.length <=0){
    return null;
}

	return (
		<section className={Slides.slideBox}>
			<div className={Slides.left} onClick={backBanner}>《</div>

			<div className={Slides.right} onClick={nextBanner}>》</div>
			{dataSlider.map((slide, index) => {
				return(
                <div className={index === current ? 'slide active' :'slide'} key={index}>
                    {index === current &&(<img className={Slides.slide} src={slide.image} />)}
                    
                    </div>
                ) 
			})}
		</section>
	)
}

export default ImageSlider
