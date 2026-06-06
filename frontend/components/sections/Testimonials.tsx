'use client'

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Chennai',
    rating: 5,
    text: '"The chocolate cake was absolutely divine. Rich ganache layers, moist sponge — worth every rupee. Will order again!"',
    initial: 'P',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    location: 'Bengaluru',
    rating: 5,
    text: '"Fresh almond croissants delivered to my door. The flaky layers and frangipane filling are perfection. I order every week!"',
    initial: 'R',
  },
  {
    id: 3,
    name: 'Ananya Iyer',
    location: 'Mumbai',
    rating: 4,
    text: '"Ordered the red velvet cake for my daughter\'s birthday. It was beautiful and absolutely delicious. Everyone loved it!"',
    initial: 'A',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-warm to-cream py-20 px-8">
      <div className="sec-head max-w-[1100px] mx-auto mb-8">
        <div className="sec-tag">Customer Love</div>
        <h2>What Our Customers Say</h2>
        <div className="divider"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
        {testimonials.map((testi) => (
          <div key={testi.id} className="bg-white border border-border rounded-[18px] p-[1.6rem]">
            <div className="text-gold text-sm mb-3">
              {'★'.repeat(testi.rating)}{'☆'.repeat(5 - testi.rating)}
            </div>
            <div className="font-display italic text-base text-dark leading-[1.65] mb-5">
              {testi.text}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-[38px] h-[38px] rounded-full bg-warm flex items-center justify-center text-sm font-bold text-brown shrink-0">
                {testi.initial}
              </div>
              <div>
                <div className="text-sm font-semibold text-dark">{testi.name}</div>
                <div className="text-xs text-muted">{testi.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
