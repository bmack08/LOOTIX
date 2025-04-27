const categories = [
    { name: "Fantasy", image: "/images/fantasy.jpg", slug: "fantasy" },
    { name: "Luxe", image: "/images/luxe.jpg", slug: "luxe" },
    { name: "Youth", image: "/images/youth.jpg", slug: "youth" },
    { name: "Accessories", image: "/images/accessories.jpg", slug: "accessories" },
  ];
  
  export default function CategoryGrid() {
    return (
      <section id="collections" className="py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-10">Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(({ name, image, slug }) => (
            <a href={`/collections/${slug}`} key={slug} className="group">
              <div className="h-48 bg-cover bg-center rounded-xl shadow-lg transition-transform group-hover:scale-105"
                style={{ backgroundImage: `url(${image})` }} />
              <p className="text-center mt-2 text-lg">{name}</p>
            </a>
          ))}
        </div>
      </section>
    );
  }
  