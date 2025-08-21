import { Page, Text, View, Document } from '@react-pdf/renderer';
export default function MyDocument() {
  return (
    <Document>
      <Page size="A4" className="bg-blue-700 m-auto p-4 text-white flex flex-col col-center justify-center">
        <View className="section">
          <Text className="text">Section #1</Text>
        </View>
      <View className="section">
        <Text className="text">Section #2</Text>
      </View>
    </Page>
  </Document>
);
}