import requests

iword = input("Digite a palavra: ")
api_url = f'https://api.dicionario-aberto.net/word/{iword}'
response = requests.get(api_url)
print("Reponse Code: ", response.status_code)
content = response.content
lista = content.decode('utf-8')

if lista == "[]":
    print("Lista vazia...")

word = 'papel';

word_list = [i for i in word];
iword_list = [x for x in iword];

for index, value in enumerate(iword_list):

    if value == word_list[index]:
        print(f'A letra {value} na posição {index} está correta.', end='\n\n');
    elif value in word_list and value != word_list[index]:
        print(f'A letra {value} está na posição incorreta, mas pertence a palavra.');
        print(f"Posição correta: {word_list.index(value)}");
    else:
        print(f'A letra {value} não pertence a palavra');
