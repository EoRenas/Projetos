import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type Categoria = "CAIXA INICIAL" | "JOGO" | "DINHEIRO" | "PIX" | "CARTÃO" | "PRÊMIO" | "DESPESA" | "FIADO TOTAL" | "FIADO DIA" | "FIADO ANTERIOR" | "DESPESAS" | "VALE";
type Valores = {
  "CAIXA INICIAL": number;
  "JOGO": number;
  "DINHEIRO": number;
  "PIX": number;
  "CARTÃO": number;
  "PRÊMIO": number;
  "DESPESA": number;
  "FIADO TOTAL": number;
  "FIADO DIA": number;
  "FIADO ANTERIOR": number;
  "DESPESAS": number;
  "VALE": number;
};

const categories: Categoria[] = [
  "CAIXA INICIAL", "JOGO", "DINHEIRO", "PIX", "CARTÃO", "PRÊMIO", "DESPESA", 
  "FIADO TOTAL", "FIADO DIA", "FIADO ANTERIOR", "DESPESAS", "VALE"
];

export default function HomeScreen() {
  const [values, setValues] = useState<Valores>({
    "CAIXA INICIAL": 0,
    "JOGO": 0,
    "DINHEIRO": 0,
    "PIX": 0,
    "CARTÃO": 0,
    "PRÊMIO": 0,
    "DESPESA": 0,
    "FIADO TOTAL": 0,
    "FIADO DIA": 0,
    "FIADO ANTERIOR": 0,
    "DESPESAS": 0,
    "VALE": 0,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Categoria | "">("");
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Inicialize como null
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const loadValues = async () => {
      try {
        const storedValues = await AsyncStorage.getItem("gastos");
        if (storedValues) {
          const parsedValues = JSON.parse(storedValues);
          setValues({
            ...values, // Mantém os valores padrão
            ...parsedValues, // Sobrescreve com os valores carregados
          });
        }
      } catch (error) {
        console.error("Erro ao carregar valores:", error);
      }
    };

    loadValues();
  }, []);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowDatePicker(false); // Fecha o seletor após escolher uma data
    if (date) {
      setSelectedDate(date);
    }
  };

  const saveValue = async () => {
    if (selectedCategory && inputValue) {
      const newValue = parseFloat(inputValue) || 0;
      const updatedValues = { ...values, [selectedCategory]: values[selectedCategory] + newValue };
      setValues(updatedValues);
      await AsyncStorage.setItem("gastos", JSON.stringify(updatedValues));
      setModalVisible(false);
      setInputValue("");
    }
  };

  const saveAndSend = async () => {
    if (!selectedDate) {
      Alert.alert("Erro", "Selecione uma data antes de salvar.");
      return;
    }

    const formattedDate = selectedDate.toLocaleDateString('pt-BR');
    const formattedTime = selectedDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const sheetValues = [
      [
        formattedDate,
        formattedTime,
        values["CAIXA INICIAL"],
        values["JOGO"],
        values["DINHEIRO"],
        values["PIX"],
        values["CARTÃO"],
        values["PRÊMIO"],
        values["DESPESA"],
        values["FIADO TOTAL"],
        values["FIADO DIA"],
        values["FIADO ANTERIOR"],
        values["DESPESAS"],
        values["VALE"],
      ]
    ];

    try {
      const response = await axios.post("http://localhost:5000/send-to-sheets", {
        spreadsheetId: "1dAGr5oTo-iR3CuamHoStYrC9k_Q-dZJLbjzO0EHinDg",
        range: "resumo!A:M",
        values: sheetValues,
      });
      console.log("Dados enviados com sucesso:", response.data);
      Alert.alert("Sucesso", "Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      Alert.alert("Erro", "Erro ao enviar dados.");
    }
  };

  const confirmSave = async () => {
    setShowConfirmation(false);
    await saveAndSend();
  };

  const getValueColor = (value: number) => {
    if (value > 0) return 'green';
    if (value < 0) return 'red';
    return 'black'; // Número 0 fica preto
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Junior Arcadia</Text>

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>
          {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : "Selecione uma data"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()} // Usa a data selecionada ou a data atual como fallback
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {categories.map((category) => (
        <View key={category} style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{category}:</Text>
          <TextInput
            style={[styles.input, { color: getValueColor(values[category] || 0) }]}
            keyboardType="numbers-and-punctuation" // Permite números e o sinal de menos
            placeholder="Digite o valor"
            value={values[category]?.toString() || ""}
            onChangeText={(text) => {
              const newValue = parseFloat(text) || 0; // Converte o texto para número
              setValues({ ...values, [category]: newValue });
            }}
          />
        </View>
      ))}

      <Button title="Adicionar Valor" onPress={() => setModalVisible(true)} />
      <Button title="Salvar" onPress={() => setShowConfirmation(true)} />
      <Button title="Limpar Dados" onPress={() => setValues({
        "CAIXA INICIAL": 0,
        "JOGO": 0,
        "DINHEIRO": 0,
        "PIX": 0,
        "CARTÃO": 0,
        "PRÊMIO": 0,
        "DESPESA": 0,
        "FIADO TOTAL": 0,
        "FIADO DIA": 0,
        "FIADO ANTERIOR": 0,
        "DESPESAS": 0,
        "VALE": 0,
      })} />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma Categoria:</Text>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton,
                ]}
              >
                <Text style={styles.categoryButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}

            {selectedCategory ? (
              <>
                <TextInput
                  style={styles.input}
                  keyboardType="numbers-and-punctuation" // Permite números e o sinal de menos
                  placeholder="Digite o valor"
                  value={inputValue}
                  onChangeText={setInputValue}
                />
                <Button title="Salvar" onPress={saveValue} />
              </>
            ) : null}

            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={showConfirmation} transparent={true}>
        <View style={styles.confirmationModal}>
          <Text>Tem certeza que deseja salvar?</Text>
          <Button title="Sim" onPress={confirmSave} />
          <Button title="Não" onPress={() => setShowConfirmation(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#000',
  },
  dateText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 18,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    width: 100,
    textAlign: 'right',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#000',
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#cce5ff',
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#000',
  },
  confirmationModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});