import React, { FC, useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { CheckBox } from 'react-native-elements';

const dataPizza = [
    {
        name: 'Pizza 1',
        price: 8,
        img: require('../../../assets/images/img1.jpg'),
        toppings: ['Avocado', 'Broccoli', 'Onions', 'Zucchini', 'Tuna', 'Ham']
    },
    {
        name: 'Pizza 2',
        price: 10,
        img: require('../../../assets/images/img2.jpg'),
        toppings: ['Broccoli', 'Onions', 'Zucchini', 'Lobster', 'Oyster', 'Salmon', 'Bacon', 'Ham']
    },
    {
        name: 'Pizza 3',
        price: 12,
        img: require('../../../assets/images/img3.jpg'),
        toppings: ['Broccoli', 'Onions', 'Zucchini', 'Tuna', 'Bacon', 'Duck', 'Ham', 'Sausage']
    }
];

const dataSize = [
    { name: 'Small', price: 1 },
    { name: 'Medium', price: 1.5 },
    { name: 'Large', price: 2 }
];

const dataToppings = [
    { name: 'Avocado', price: 1 },
    { name: 'Broccoli', price: 1 },
    { name: 'Onions', price: 1 },
    { name: 'Zucchini', price: 1 },
    { name: 'Lobster', price: 2 },
    { name: 'Oyster', price: 2 },
    { name: 'Salmon', price: 2 },
    { name: 'Tuna', price: 2 },
    { name: 'Bacon', price: 3 },
    { name: 'Duck', price: 3 },
    { name: 'Ham', price: 3 },
    { name: 'Sausage', price: 3 }
];

const Home: FC = () => {
    const [selectedPizza, setSelectedPizza] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('Small');
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
    const [availableToppings, setAvailableToppings] = useState<string[]>([]);
    const [showToppings, setShowToppings] = useState<boolean>(false);

    useEffect(() => {
        if (selectedPizza) {
            const pizza = dataPizza.find(p => p.name === selectedPizza);
            if (pizza) {
                setAvailableToppings(pizza.toppings);
                setSelectedToppings([]);
                setShowToppings(true);
            }
        }
    }, [selectedPizza]);

    const handlePizzaChange = (pizzaName: string) => {
        setSelectedPizza(pizzaName);
    };

    const handleSizeChange = (sizeName: string) => {
        setSelectedSize(sizeName);
    };

    const handleToppingChange = (toppingName: string) => {
        const isSelected = selectedToppings.includes(toppingName);
        if (isSelected) {
            setSelectedToppings(prevToppings => prevToppings.filter(topping => topping !== toppingName));
        } else {
            setSelectedToppings(prevToppings => [...prevToppings, toppingName]);
        }
    };

    const calculateTotalPrice = (): number => {
        const pizza = dataPizza.find(p => p.name === selectedPizza);
        const size = dataSize.find(s => s.name.toLowerCase() === selectedSize.toLowerCase());

        if (!pizza || !size) return 0;

        const sizeMultiplier = size.price || 1;

        const toppingsPrice = selectedToppings.reduce(
            (total, topping) => total + (dataToppings.find(t => t.name === topping)?.price || 0),
            0
        );

        return pizza.price + toppingsPrice + sizeMultiplier;
    };

    const totalPrice = calculateTotalPrice();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Text style={styles.title}>Pizza</Text>
                <View style={styles.container}>
                    {dataPizza.map((d, i) => (
                        <View key={i} style={styles.item}>
                            <Image source={d.img} style={styles.image} />
                            <Text>{d.name}</Text>
                            <Text>{`$${d.price}`}</Text>
                            <CheckBox
                                checked={selectedPizza === d.name}
                                onPress={() => handlePizzaChange(d.name)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                        </View>
                    ))}
                </View>

                <Text style={styles.title}>Size</Text>
                <View style={styles.container}>
                    {dataSize.map((d, i) => (
                        <View key={i} style={styles.item}>
                            <CheckBox
                                checked={selectedSize === d.name}
                                onPress={() => handleSizeChange(d.name)}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                            />
                            <Text>{d.name}</Text>
                        </View>
                    ))}
                </View>

                {showToppings && (
                    <>
                        <Text style={styles.title}>Toppings</Text>
                        <View style={styles.toppingsContainer}>
                            {availableToppings.map((d, i) => (
                                <View key={i} style={styles.toppingsItem}>
                                    <CheckBox
                                        checked={selectedToppings.includes(d)}
                                        onPress={() => handleToppingChange(d)}
                                    />
                                    <Text>{d}</Text>
                                </View>
                            ))}
                        </View>
                    </>
                )}

                <Text style={styles.title}>Price</Text>
                <View style={{ marginLeft: 30 }}>
                    <Text style={styles.priceText}>{`$ ${totalPrice.toFixed(2)}`}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },
    item: {
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 12
    },
    toppingsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    toppingsItem: {
        alignItems: 'center',
        margin: 10,
        width: '20%',
    },
    priceText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Home;
