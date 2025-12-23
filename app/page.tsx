import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import SafeImage from '@/components/SafeImage';
import * as dbHelper from '@/lib/db-helper';

const PHONE_NUMBER = '+919761396049'; // Update with your phone number
const WHATSAPP_NUMBER = '+919761396049'; // Update with your WhatsApp number

export default async function Home() {
  const products = await dbHelper.getAllProducts();
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="overflow-hidden">
      {/* Animated Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400 opacity-10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400 opacity-10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 text-6xl animate-float opacity-20">🛍️</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-float-delayed opacity-20">💰</div>
          <div className="absolute bottom-1/4 left-1/3 text-7xl animate-float opacity-20">📦</div>
          <div className="absolute bottom-1/3 right-1/3 text-6xl animate-float-delayed opacity-20">⭐</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="text-center animate-zoom-in">
            <div className="inline-block mb-6 animate-wiggle">
              <span className="text-8xl">🏪</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 animate-slide-up bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Rashmi Traders
            </h1>
            <p className="text-2xl md:text-4xl mb-4 text-yellow-200 font-bold animate-slide-up animate-delay-100">
              Trusted Retail & Wholesale Supplier
            </p>
            <p className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto text-white/90 animate-slide-up">
              🎯 Quality products at unbeatable prices. Serving thousands of satisfied customers with excellence and dedication.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-zoom-in">
              <Link
                href="/products"
                className="group bg-white text-primary-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-200 transition-all transform hover:scale-110 shadow-2xl hover:shadow-yellow-300/50 relative overflow-hidden"
              >
                <span className="relative z-10">🛒 View Products</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="group bg-primary-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-400 transition-all transform hover:scale-110 shadow-2xl border-4 border-white/50 animate-bounce-slow"
              >
                📞 Call Now
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-green-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all transform hover:scale-110 shadow-2xl hover:shadow-green-400/50"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="text-4xl font-black mb-2">500+</div>
              <div className="text-sm text-white/80">Happy Customers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="text-4xl font-black mb-2">200+</div>
              <div className="text-sm text-white/80">Products</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="text-4xl font-black mb-2">2+</div>
              <div className="text-sm text-white/80">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105">
              <div className="text-4xl font-black mb-2">Daily</div>
              <div className="text-sm text-white/80">Delivery</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 animate-slide-up">
              Our Showcase
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-primary-600 to-pink-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-xl text-gray-600">Explore our amazing product range</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Biscuits & Snacks', img: 'https://drive.google.com/uc?export=view&id=1IZmBn4-exEWvxcqAFAb-8IulJ1S63t6B', fallback: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop' },
              { name: 'Rice & Pulses', img: 'https://drive.google.com/uc?export=view&id=1BaQ0cunua_T2p5xQgUL_GxJAxtIQQM4u', fallback: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop' },
              { name: 'Cooking Oil', img: 'https://drive.google.com/uc?export=view&id=1BaQ0cunua_T2p5xQgUL_GxJAxtIQQM4u', fallback: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop' },
              { name: 'Spices & Masala', img: 'https://drive.google.com/uc?export=view&id=1IZmBn4-exEWvxcqAFAb-8IulJ1S63t6B', fallback: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop' },
              { name: 'Namkeen', img: 'https://drive.google.com/uc?export=view&id=1IZmBn4-exEWvxcqAFAb-8IulJ1S63t6B', fallback: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop' },
              { name: 'Soap & Shampoo', img: 'https://drive.google.com/uc?export=view&id=1ek2BkM48tg7yxAU-fmDwnD7M2lwN45ML', fallback: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop' },
              { name: 'Detergents', img: 'https://drive.google.com/uc?export=view&id=1ek2BkM48tg7yxAU-fmDwnD7M2lwN45ML', fallback: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop' },
              { name: 'Household Items', img: 'https://drive.google.com/uc?export=view&id=1ek2BkM48tg7yxAU-fmDwnD7M2lwN45ML', fallback: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop' },
            ].map((item, i) => (
              <div
                key={i}
                className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <SafeImage
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                  fallbackSrc={(item as any).fallback || `https://picsum.photos/400/400?random=grocery${i}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white font-bold">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Images */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 text-9xl animate-spin-slow">🛒</div>
          <div className="absolute bottom-20 right-20 text-9xl animate-spin-slow" style={{ animationDirection: 'reverse' }}>💰</div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-left">
              <div className="relative">
                <SafeImage
                  src="https://drive.google.com/uc?export=view&id=1b3vVwclLCliORSGubtEOqJiTxsLguHlU"
                  alt="Rashmi Traders Store Interior"
                  className="rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  fallbackSrc="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-8 rounded-2xl shadow-xl transform rotate-6 hover:rotate-0 transition-transform">
                  <div className="text-4xl font-black">2+</div>
                  <div className="text-sm">Years</div>
                </div>
              </div>
            </div>
            <div className="animate-slide-right">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                About <span className="text-primary-600">Rashmi Traders</span>
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  🎯 Welcome to <strong>Rashmi Traders</strong>, your premier destination for quality retail and wholesale products. 
                  We've been serving customers with excellence for over 2 years, building trust one transaction at a time.
                </p>
                <p>
                  ✨ Our mission is simple: provide the <strong>best quality products</strong> at the <strong>most competitive prices</strong> 
                  while delivering exceptional customer service that goes above and beyond.
                </p>
                <p>
                  🚀 With thousands of products in stock and a team dedicated to your satisfaction, we're here to make 
                  your shopping experience seamless and enjoyable.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-primary-100 px-6 py-3 rounded-full font-semibold text-primary-700">✓ Quality Assured</div>
                <div className="bg-green-100 px-6 py-3 rounded-full font-semibold text-green-700">✓ Fast Delivery</div>
                <div className="bg-yellow-100 px-6 py-3 rounded-full font-semibold text-yellow-700">✓ Best Prices</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="py-24 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-float">⭐</div>
          <div className="absolute top-20 right-20 text-7xl animate-float-delayed">💎</div>
          <div className="absolute bottom-10 left-1/4 text-9xl animate-float">🏆</div>
          <div className="absolute bottom-20 right-10 text-6xl animate-float-delayed">🎖️</div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 animate-slide-up">
              Why Choose <span className="text-primary-600">Us?</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-primary-600 to-pink-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-xl text-gray-600">We're not just a shop, we're your trusted partner</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '⭐', title: 'Quality Products', desc: 'We source only the finest products, ensuring quality and durability in every item we offer.', color: 'from-yellow-400 to-orange-500' },
              { icon: '💰', title: 'Best Pricing', desc: 'Competitive prices that give you the best value for your money without hidden costs.', color: 'from-green-400 to-emerald-500' },
              { icon: '🤝', title: 'Trusted Service', desc: 'Reliable service and support. We\'re here to help you every step of the way.', color: 'from-blue-400 to-cyan-500' },
              { icon: '🚀', title: 'Fast Delivery', desc: 'Quick and reliable delivery service to get your products to you as fast as possible.', color: 'from-purple-400 to-pink-500' },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-xl text-center hover:shadow-2xl transition-all transform hover:scale-105 hover:-translate-y-2 group border-2 border-transparent hover:border-primary-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`text-7xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                <div className={`mt-6 h-1 bg-gradient-to-r ${feature.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              Our <span className="text-primary-600">Services</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-primary-600 to-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏪', title: 'Retail Sales', desc: 'Walk-in customers welcome! Browse our extensive collection in-store.', image: 'https://drive.google.com/uc?export=view&id=1IZmBn4-exEWvxcqAFAb-8IulJ1S63t6B' },
              { icon: '📦', title: 'Wholesale', desc: 'Bulk orders for businesses. Special pricing for wholesale customers.', image: 'https://drive.google.com/uc?export=view&id=1b3vVwclLCliORSGubtEOqJiTxsLguHlU' },
              { icon: '🚚', title: 'Delivery', desc: 'Fast and reliable delivery service to your doorstep.', image: 'https://drive.google.com/uc?export=view&id=1BaQ0cunua_T2p5xQgUL_GxJAxtIQQM4u' },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="relative h-64 overflow-hidden">
                  <SafeImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                    fallbackSrc={index === 0 ? 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop' : index === 1 ? 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop' : 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&h=400&fit=crop'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-5xl mb-2">{service.icon}</div>
                    <h3 className="text-2xl font-black text-white mb-2">{service.title}</h3>
                    <p className="text-white/90">{service.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              How It <span className="text-yellow-400">Works</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', icon: '🔍', title: 'Browse', desc: 'Explore our wide range of products' },
              { step: '02', icon: '💬', title: 'Enquire', desc: 'Contact us via WhatsApp or Call' },
              { step: '03', icon: '✅', title: 'Confirm', desc: 'We confirm your order details' },
              { step: '04', icon: '📦', title: 'Receive', desc: 'Get your products delivered' },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group relative"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative bg-gradient-to-br from-primary-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-4xl transform group-hover:scale-110 group-hover:rotate-12 transition-all shadow-2xl">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-white/80">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary-400 to-transparent transform translate-x-4">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary-400 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
              What Our <span className="text-primary-600">Customers Say</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-primary-600 to-pink-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Business Owner', text: 'Amazing quality and service! Best prices in town. Highly recommended!', rating: 5 },
              { name: 'Mike Chen', role: 'Retailer', text: 'Fast delivery and excellent customer support. My go-to supplier!', rating: 5 },
              { name: 'Emily Davis', role: 'Customer', text: 'Great variety of products. Always satisfied with my purchases!', rating: 5 },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-100 hover:border-primary-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-2xl text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center text-white font-black text-lg mr-4">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-black text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 animate-slide-up">
                Featured <span className="text-primary-600">Products</span>
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-primary-600 to-pink-600 mx-auto mb-4 rounded-full"></div>
              <p className="text-xl text-gray-600">Check out our latest and most popular products</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <div
                  key={product._id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    availability={product.availability}
                    description={product.description}
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-block bg-gradient-to-r from-primary-600 to-purple-600 text-white px-10 py-4 rounded-full font-black text-lg hover:from-primary-700 hover:to-purple-700 transition-all transform hover:scale-110 shadow-2xl"
              >
                🛒 View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA Section - Enhanced */}
      <section className="py-24 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-9xl animate-float">📞</div>
          <div className="absolute bottom-10 right-10 text-9xl animate-float-delayed">💬</div>
          <div className="absolute top-1/2 left-1/2 text-8xl animate-pulse-slow">✨</div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 animate-slide-up">
            Ready to Get Started?
          </h2>
          <p className="text-2xl mb-12 text-white/90 max-w-2xl mx-auto animate-slide-up">
            Contact us today for inquiries, quotes, or to place an order. We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-zoom-in">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="group bg-white text-primary-600 px-10 py-4 rounded-full font-black text-lg hover:bg-yellow-200 transition-all transform hover:scale-110 shadow-2xl hover:shadow-yellow-300/50 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="text-2xl">📞</span>
                <span>Call {PHONE_NUMBER}</span>
              </span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-green-500 text-white px-10 py-4 rounded-full font-black text-lg hover:bg-green-600 transition-all transform hover:scale-110 shadow-2xl hover:shadow-green-400/50 flex items-center gap-2"
            >
              <span className="text-2xl">💬</span>
              <span>WhatsApp Us</span>
            </a>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-2">⏰</div>
              <div className="font-bold">24/7 Support</div>
              <div className="text-sm text-white/80">Always here for you</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🚚</div>
              <div className="font-bold">Fast Delivery</div>
              <div className="text-sm text-white/80">Quick & reliable</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-2">💯</div>
              <div className="font-bold">100% Satisfaction</div>
              <div className="text-sm text-white/80">Guaranteed quality</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
