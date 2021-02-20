{
  let tl = gsap.timeline(); //create the timeline
  let tl_logo = gsap.timeline({ repeat: 2, yoyo: true, yoyoEase: "elastic" });

  gsap.set(["#login", "#appForm"], {
    opacity: 0,
    x: 50,
  });

gsap.set("#auth", {
  display:"none",
  x:-1000
})

  gsap.set(["#appTitle", "#appDesc"], {
    y: 200,
    opacity: 0,
  });

  tl.to(["body", "#login"], {
    ease: "slow",
    duration: 0.5,
    backgroundColor: "#000",
    opacity: 1,
    x: 0,
  })
    .to(["#appForm"], {
      ease: "slow",
      duration: 0.5,
      delay: 1,
      opacity: 1,
      x: 0,
    })
    .to(["#appTitle"], {
      ease: "elastic",
      opacity: 1,
      duration: 1,
      y: -30,
    })
    .to("#appDesc", {
      ease: "back",
      opacity: 1,
      duration: 1,
      y: 0,
    });

  tl_logo
    .from("#appLogo", {
      rotation: 0,
      duration: 2,
    })
    .to("#appLogo", {
      rotation: 1080,
      duration: 2,
    })
    .to(["body", "#login"], {
      ease: "slow",
      duration: 0.5,
      backgroundColor: "#fff",
    });
}

function startApp() {
  let tl = gsap.timeline()

  tl.to("#appForm",{
    rotation:360,
    duration:2.5,
    ease:"back"
  }).to("#login", {
    y:100,
    duration:2,
    display:"none",
    opacity:0
  }).to("#auth", {
    x:0,
    ease:"rough",
    duration:2,
    display:"block",
    opacity:1
  })
}