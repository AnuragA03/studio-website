function init() {
    // Taken from locomotive scrolltrigger codepen
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

init();


// ! GSAP Animation to move the h1 and h2 elem in page 1
// gsap.to(): This is the main method for creating a tween (an animation) in GSAP. It takes three arguments: the target element(s), the properties to animate, and the animation's configuration.

// "#page1 h1": This is the target element, which is an <h1> element inside an element with the ID page1.

// { x: -80, duration: 1 }: These are the properties to animate. In this case, the animation will move the <h1> element 80 pixels to the left (x: -80) over a duration of 1 second (duration: 1).

// scrollTrigger: This is an object that configures the scroll trigger for the animation. A scroll trigger is a feature in GSAP that allows you to tie an animation to the scrolling of a specific element.

// trigger: "#page1 h1": This specifies the element that will trigger the animation when it comes into view. In this case, it's the same <h1> element that's being animated.

// scroller: ".main": This specifies the element that will be scrolled to trigger the animation. In this case, it's an element with the class main.

// markers: true: This adds visual markers to the page to indicate the start and end points of the animation.

// start: "top 30%": This specifies the starting point of the animation, which is when the top of the trigger element (#page1 h1) reaches 30% from the top of the scroller element (.main).

// end: "top 0": This specifies the ending point of the animation, which is when the top of the trigger element reaches the top of the scroller element.

// scrub: 2: This specifies the scrubbing behavior of the animation. Scrubbing allows the animation to be controlled by the scroll position. In this case, the animation will be scrubbed 2 times faster than the scroll speed.

// The "anu" label ensures that this animation happens simultaneously with the h1 animation.

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#page1 h1",
        scroller: ".main",
        markers: true,
        start: "top 27%",
        end: "top 0",
        scrub: 3
    }
})

tl.to("#page1 h1", {
    x: -100,

},"anu")

tl.to('#page1 h2', {
    x: 100,
}, "anu")

tl.to("#page1 video", {
    width: "90%"
},"anu")


var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page1 h1",
        scroller: ".main",
        markers: true,
        start: "top -115%",
        end: "top -120%",
        scrub: 3
    }
})
tl2.to(".main",{
    backgroundColor: "#fff"
})