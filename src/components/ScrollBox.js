import React from 'react';
import posed from 'react-pose';
import { transform, value, styler, spring, listen, decay, pointer, stagger } from 'popmotion';
const { clamp } = transform;
// Constants
const SLIDE_AXIS = 'x';
const SLIDE_DURATION = 300;
const SLIDE_DAMPING = 40;

export default class ScrollBox extends React.Component {

    static defaultProps ={
        index:0
    }

    scrollRef = React.createRef();

    componentDidMount() {
        this.collectCards();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.index !== this.props.index) {
            this.slideToIndex(this.props.index);
        }
    }

    slideToIndex(index) {
        // Get and cleanse variables
        const toIndex = clamp(0,this.props.children.length-1)(index);
        const slider = this.scrollRef.current;
        const cards = this.props.children;
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
        const cardStyles = Array.from(document.getElementsByClassName('scroll-card')).map(styler);
        const totalCards = cardStyles.length;
        // Animate cards
        const animations = cardStyles.map((card, idx) => {
            const offset = idx - this.props.index;
            card.set('zIndex', (1000 - Math.abs(100 * offset)));
            return spring({
                from: {
                    scale: card.get('scale'),
                    x: card.get('x')
                },
                to: {
                    scale: 1 - Math.abs((0.3/totalCards) * offset),
                    x:-(card.get('width')*0.618*offset)+(card.get('width')/2)
                },
                duration: SLIDE_DURATION,
                damping: SLIDE_DAMPING
            });
        });

        stagger(animations, -SLIDE_DURATION).start(v => v.forEach((x, i) => cardStyles[i].set(x)));
    }

    render() {
        return (
            <div className="scroll-box" pose={this.props.index} ref={this.scrollRef}>
                {this.props.children}
            </div>
        )
    }
}

class ScrollCard extends React.Component {

    render() {
        return (<div></div>)
    }
}

export { ScrollCard }