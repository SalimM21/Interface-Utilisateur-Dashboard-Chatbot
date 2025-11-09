import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatbotWidget from '../components/ChatbotWidget';
import chatService from '../services/chatService';

// Mock du service de chat
jest.mock('../services/chatService');

describe('ChatbotWidget E2E Tests', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
  });

  test('affiche et masque correctement le widget', async () => {
    render(<ChatbotWidget />);
    
    // Vérifier que le bouton d'ouverture est visible
    const openButton = screen.getByRole('button');
    expect(openButton).toBeInTheDocument();
    
    // Ouvrir le widget
    fireEvent.click(openButton);
    
    // Vérifier que la fenêtre de chat est visible
    const chatWindow = screen.getByRole('dialog');
    expect(chatWindow).toBeInTheDocument();
    
    // Fermer le widget
    const closeButton = screen.getByLabelText('Fermer');
    fireEvent.click(closeButton);
    
    // Vérifier que la fenêtre est fermée
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  test('envoie et reçoit des messages correctement', async () => {
    // Simuler une réponse du bot
    chatService.sendMessage.mockResolvedValue([
      { text: 'Je suis là pour vous aider !' }
    ]);

    render(<ChatbotWidget />);
    
    // Ouvrir le widget
    fireEvent.click(screen.getByRole('button'));
    
    // Saisir et envoyer un message
    const input = screen.getByPlaceholderText('Écrivez votre message...');
    const message = 'Bonjour, comment allez-vous ?';
    
    await userEvent.type(input, message);
    fireEvent.submit(screen.getByRole('form'));

    // Vérifier que le message utilisateur est affiché
    expect(screen.getByText(message)).toBeInTheDocument();

    // Vérifier que la réponse du bot s'affiche
    await waitFor(() => {
      expect(screen.getByText('Je suis là pour vous aider !')).toBeInTheDocument();
    });

    // Vérifier que le service a été appelé avec le bon message
    expect(chatService.sendMessage).toHaveBeenCalledWith(message);
  });

  test('gère correctement les erreurs', async () => {
    // Simuler une erreur
    chatService.sendMessage.mockRejectedValue(new Error('Erreur réseau'));

    render(<ChatbotWidget />);
    
    // Ouvrir le widget
    fireEvent.click(screen.getByRole('button'));
    
    // Envoyer un message
    const input = screen.getByPlaceholderText('Écrivez votre message...');
    await userEvent.type(input, 'Test erreur');
    fireEvent.submit(screen.getByRole('form'));

    // Vérifier que le message d'erreur s'affiche
    await waitFor(() => {
      expect(screen.getByText(/Désolé, une erreur s'est produite/)).toBeInTheDocument();
    });
  });

  test('montre l\'indicateur de chargement', async () => {
    // Simuler une réponse lente
    chatService.sendMessage.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve([{ text: 'Réponse' }]), 1000))
    );

    render(<ChatbotWidget />);
    
    // Ouvrir le widget et envoyer un message
    fireEvent.click(screen.getByRole('button'));
    const input = screen.getByPlaceholderText('Écrivez votre message...');
    await userEvent.type(input, 'Test chargement');
    fireEvent.submit(screen.getByRole('form'));

    // Vérifier que l'indicateur de chargement est visible
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Attendre la réponse et vérifier que l'indicateur disparaît
    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });
  });

  test('conserve l\'historique des messages', async () => {
    // Simuler plusieurs réponses du bot
    chatService.sendMessage
      .mockResolvedValueOnce([{ text: 'Première réponse' }])
      .mockResolvedValueOnce([{ text: 'Deuxième réponse' }]);

    render(<ChatbotWidget />);
    
    // Ouvrir le widget
    fireEvent.click(screen.getByRole('button'));
    
    // Envoyer premier message
    const input = screen.getByPlaceholderText('Écrivez votre message...');
    await userEvent.type(input, 'Premier message');
    fireEvent.submit(screen.getByRole('form'));

    // Vérifier la première conversation
    await waitFor(() => {
      expect(screen.getByText('Premier message')).toBeInTheDocument();
      expect(screen.getByText('Première réponse')).toBeInTheDocument();
    });

    // Envoyer deuxième message
    await userEvent.type(input, 'Deuxième message');
    fireEvent.submit(screen.getByRole('form'));

    // Vérifier que tous les messages sont présents
    await waitFor(() => {
      expect(screen.getByText('Premier message')).toBeInTheDocument();
      expect(screen.getByText('Première réponse')).toBeInTheDocument();
      expect(screen.getByText('Deuxième message')).toBeInTheDocument();
      expect(screen.getByText('Deuxième réponse')).toBeInTheDocument();
    });
  });
});