import ContactForm from '../components/contact';
export default function Contact() {
  return (
    <div className="py-16 px-4 text-center text-gray-600 bg-gradient-to-r from-blue-50 to-blue-500 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-md ">
        <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>
        <ContactForm />
      </div>
           
    </div>
  );
}
