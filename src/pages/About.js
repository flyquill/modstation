import React from 'react';

export default function About() {

  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-12">
          <h2 className="mb-4">About Us</h2>
          <p className="text-light">
            At GTAModStation, we are passionate FiveM developers dedicated to bringing high-quality, optimized, and lore-friendly mods to the community. Our goal is to enhance the gameplay experience by providing a wide variety of vehicles and custom models tailored for roleplay and fun.
          </p>
          <p className="text-light">
            We specialize in creating: <br />
            * Civilian and utility vehicles <br />
            * Emergency response vehicles <br />
            * Military vehicles and equipment <br />
            * Motorbikes and aircraft <br />
            * Unique concepts like flying cars <br />
            * And much more…
          </p>
          <p className="text-light">
            Every model we build is carefully crafted for performance and compatibility with FiveM, ensuring that your server runs smoothly while offering players something exciting and immersive.
          </p>
          <p className="text-light">
            Whether you’re running a roleplay community, a themed server, or simply want to add more depth to your FiveM experience, GTAModStation has something for you. And if you want something truly unique, we also accept custom model requests.
          </p>
        </div>
      </div>

      <hr />

      <section className="py-5" style={{ backgroundColor: '#0B0909', color: '#fff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="text-light">Who We Are</h2>
              <p className="lead text-light">Meet our talented and dedicated team.</p>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-md-4 g-4">

            {/* Team Member 1 */}
            <div className="col">
              <div className="card shadow-lg border-0 rounded text-center h-100" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                {/* <div
                                    className="img-wrapper rounded-circle mx-auto"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        overflow: 'hidden',
                                        marginTop: '-75px',
                                        border: '5px solid #0B0909',
                                        backgroundColor: '#0B0909'
                                    }}
                                >
                                    <img src="assets/images/clients/c1.png" alt="John Doe" className="card-img-top rounded-circle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div> */}
                <div className="card-body py-3">
                  <h6 className="card-title mb-1">Ashhar</h6>
                  <p className="small mb-1">Founder + Developer</p>
                  {/* <p className="card-text small">Ashhar's vision drives our innovation.</p> */}
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="col">
              <div className="card shadow-lg border-0 rounded text-center h-100" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body py-3">
                  <h6 className="card-title mb-1">Ziara</h6>
                  <p className="small mb-1">Co-Founder + Lead Developer</p>
                  {/* <p className="card-text small">Ziara excels in building scalable mod development.</p> */}
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="col">
              <div className="card shadow-lg border-0 rounded text-center h-100" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body py-3">
                  <h6 className="card-title mb-1">Rahm</h6>
                  <p className="small mb-1">Vehicle developer</p>
                  {/* <p className="card-text small">Rahm builds strong brand identities.</p> */}
                </div>
              </div>
            </div>


            {/* Team Member 4 */}
            <div className="col">
              <div className="card shadow-lg border-0 rounded text-center h-100" style={{ backgroundColor: '#1a1a1a', color: '#fff' }}>
                <div className="card-body py-3">
                  <h6 className="card-title mb-1">Shurlee</h6>
                  <p className="small mb-1">Developer</p>
                  {/* <p className="card-text small">David excels in building scalable web applications.</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

  );
}
