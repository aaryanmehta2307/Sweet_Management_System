import Navbar from "../Components/Navbar";
import pic1 from "../assets/Landing_photo_4.jpg";
import pic2 from "../assets/Landing_page_sweet.png";
import pic3 from "../assets/Landing_photo_2.jpg";
import pic4 from "../assets/Landing_photo_6.jpg";
import pic5 from "../assets/Landing_photo_5.jpg";



const Landing = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-32 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Fresh & Handcrafted <br /> Sweets Made with Love
            </h1>

            <p className="opacity-80 mb-8">
              Discover, manage, and purchase delicious sweets using a modern
              sweet shop management system.
            </p>

            <div className="flex gap-4">
              <a
                href="#sweets"
                className="
                  px-6 py-3 rounded-full shadow-lg
                  transition-all duration-200
                  active:scale-95
                "
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-dark)"
                }}
              >
                Our Services
              </a>

              <a
                href="/auth"
                className="
                  px-6 py-3 rounded-full border-2
                  transition-all duration-200
                  active:scale-95
                "
                style={{
                  borderColor: "var(--color-primary)"
                }}
              >
                Get Started
              </a>
            </div>
          </div>

          <img
            src={pic1}
            alt="Dessert"
            className="rounded-2xl shadow-xl hover:scale-105 transition duration-300"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20" style={{ backgroundColor: "var(--color-soft)" }}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {["Easy Inventory", "Secure Payments", "Admin Control"].map(item => (
            <div
              key={item}
              className="
                p-6 rounded-xl shadow
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
              "
              style={{ backgroundColor: "var(--color-base)" }}
            >
              <h3 className="text-xl font-semibold mb-3">{item}</h3>
              <p className="opacity-75">
                Efficient and reliable sweet shop operations.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SWEETS */}
      <section id="sweets" className="py-20">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-12">
      Our Services
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        { title: "Cakes", image: pic3 },
        { title: "Indian Sweets", image: pic5 },
        { title: "Cupcakes", image: pic4 }
      ].map((item) => (
        <div
          key={item.title}
          className="
            rounded-xl shadow
            hover:shadow-xl hover:-translate-y-1
            transition-all duration-300
          "
          style={{ backgroundColor: "var(--color-soft)" }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="rounded-t-xl w-full h-64 object-cover"
          />

          <div className="p-4 text-center">
            <h3 className="font-semibold text-lg">
              {item.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* ABOUT */}
      <section id="about" className="py-20" style={{ backgroundColor: "var(--color-soft)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="opacity-75">
            We believe sweets create happiness. Our platform helps sweet shops
            manage inventory, users, and sales effortlessly.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-6 text-center font-medium"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        © 2025 Sweet Shop Management System
      </footer>
    </>
  );
};

export default Landing;
