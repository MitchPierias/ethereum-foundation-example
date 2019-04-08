import React from 'react';
import { value, styler, spring, stagger } from 'popmotion';
// Constants
const SLIDE_AXIS:string = 'x';
const SLIDE_DURATION:number = 300;
const SLIDE_DAMPING:number = 40;

interface ScrollBoxProps {
    index:number
}

interface ScrollBoxState {}

/**
 * ScrollBox
 * @desc Manages user scroll interaction for a collection of ScrollCard elements
 */
export default class ScrollBox extends React.Component<ScrollBoxProps, ScrollBoxState> {

    scrollRef:React.RefObject<HTMLDivElement> = React.createRef();

    componentDidMount() {
        //this.collectCards();
    }

    componentDidUpdate(prevProps:ScrollBoxProps) {
        if (prevProps.index !== this.props.index) {
            this.slideToIndex(this.props.index);
        }
    }

    slideToIndex(index:number) {
        // Get and cleanse variables
        const slider:HTMLDivElement = this.scrollRef.current!;
        // Initialize controllers
        const sliderStyle = styler(slider);
        const sliderValue = value(sliderStyle.get(SLIDE_AXIS), sliderStyle.set(SLIDE_AXIS));
        // Calculate final scroll position
        const toPosition = `-${44*index}vw`;
        // Animate slider
        spring({
            from: sliderValue.get(),
            to: toPosition,
            duration: SLIDE_DURATION,
            damping: SLIDE_DAMPING
        }).start(sliderValue);
        // Animate cards
        this.collectCards();
    }

    collectCards() {
        // Capture and wrap all scroll cards
        const cardStyles:any = Array.from(document.getElementsByClassName('scroll-card')).map(styler);
        const totalCards:number = cardStyles.length;
        // Animate cards
        const animations = cardStyles.map((card:any, idx:number) => {
            const offset = idx - this.props.index;
            card.set('zIndex', (1000 - Math.abs(100 * offset)));
            return spring({
                from: {
                    scale: card.get('scale'),
                    [SLIDE_AXIS]: card.get(SLIDE_AXIS)
                },
                to: {
                    scale: 1 - Math.abs((0.3/totalCards) * offset),
                    [SLIDE_AXIS]:-(card.get('width')*0.618*offset)+(card.get('width')/2)
                },
                duration: SLIDE_DURATION,
                damping: SLIDE_DAMPING
            });
        });

        stagger(animations, -SLIDE_DURATION).start((v:number[]) => v.forEach((x:number, i:number) => cardStyles[i].set(x)));
    }

    render() {
        return (
            <div className="scroll-box" ref={this.scrollRef}>{this.props.children}</div>
        )
    }
}