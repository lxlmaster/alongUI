import { withInstall } from '@along-ui/utils'
import Carousel from './src/carousel.vue'
import CarouselItem from './src/carousel-item.vue'

export const AlCarousel = withInstall(Carousel)
export const AlCarouselItem = withInstall(CarouselItem)

export * from './src/carousel'
export default AlCarousel
