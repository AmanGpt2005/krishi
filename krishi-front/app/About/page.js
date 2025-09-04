"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* 🌱 Hero Section */}
      <motion.div
        className="text-center py-12 px-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-green-700">
          🌾 About Us
        </h1>
        <p className="text-lg text-green-800 mt-3 max-w-2xl mx-auto">
          Empowering farmers with technology, knowledge, and modern solutions –
          bridging the gap between traditional farming and digital innovation.
        </p>
      </motion.div>

      {/* 💡 Mission & Vision */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <motion.div
          className="bg-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-bold text-yellow-300">🌱 Our Mission</h2>
          <p className="mt-3 text-green-50">
            To support farmers by providing a digital platform where they can
            sell their crops directly, access modern farming products, and
            benefit from reliable agricultural knowledge.
          </p>
        </motion.div>

        <motion.div
          className="bg-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-bold text-yellow-300">🌍 Our Vision</h2>
          <p className="mt-3 text-green-50">
            To build a sustainable and digitally connected agriculture ecosystem
            that uplifts farmer incomes, reduces middlemen, and brings innovation
            to every farm.
          </p>
        </motion.div>
      </div>

      {/* 🤝 Our Values */}
      <motion.div
        className="text-center py-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-green-700">🤝 Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          {[
            { title: "Innovation", desc: "Bringing smart farming solutions and digital access to farmers." },
            { title: "Sustainability", desc: "Promoting eco-friendly practices and long-term agricultural growth." },
            { title: "Empowerment", desc: "Ensuring farmers get fair value, resources, and knowledge." },
          ].map((value, index) => (
            <motion.div
              key={index}
              className="p-6 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition duration-300"
              whileHover={{ scale: 1.08 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-yellow-300">{value.title}</h3>
              <p className="mt-2 text-green-50">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 📞 Contact Section */}
      <motion.div
        className="text-center py-12 px-6 bg-green-700 text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-yellow-300">📞 Get in Touch</h2>
        <p className="mt-3 text-green-100">
          Have questions or want to collaborate? Reach out to us.
        </p>
        <p className="mt-2 font-semibold">✉️ Email: support@agriplatform.com</p>
        <p className="font-semibold">📍 Location: Lucknow, India</p>
      </motion.div>
    </div>
  );
}
