import  { useState } from 'react';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message envoyé! Nous vous répondrons bientôt.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nom complet"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
        />
      </div>

      <div>
        <select
          name="subject"
          id="subject"
          placeholder="Sujet"
          value={formData.subject}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800"
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="reservation">Problème de réservation</option>
          <option value="refund">Demande de remboursement</option>
          <option value="general">Question générale</option>
        </select>
      </div>

      <div>
        <textarea
          name="message"
          id="message"
          rows="4"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2  rounded bg-white dark:bg-gray-800"
        ></textarea>
      </div>

      <div>
        <input
          type="file"
          placeholder="Joindre un fichier (optionnel)"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-500 hover:file:bg-blue-100 dark:bg-gray-800"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
};

export default ContactForm;