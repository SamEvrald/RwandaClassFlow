import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Send,
  Users,
  Mail,
  Bell,
  Calendar,
  Eye,
  UserCheck
} from 'lucide-react';

interface Message {
  id: number;
  title: string;
  content: string;
  sender: {
    first_name: string;
    last_name: string;
    role: string;
  };
  recipients: string[];
  sent_at: string;
  message_type: 'announcement' | 'notification' | 'message';
  priority: 'low' | 'medium' | 'high';
  read_count: number;
  total_recipients: number;
}

const AdminCommunications: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    filterMessages();
  }, [messages, searchTerm, typeFilter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Fetch communications from API
      const response = await api.get('/communications/');
      setMessages(response.data);
    } catch (err: any) {
      setError('Failed to load messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterMessages = () => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${message.sender.first_name} ${message.sender.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(message => message.message_type === typeFilter);
    }

    setFilteredMessages(filtered);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'bg-blue-100 text-blue-800';
      case 'notification':
        return 'bg-yellow-100 text-yellow-800';
      case 'message':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <Bell className="h-4 w-4" />;
      case 'notification':
        return <Mail className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2" />
              Communications
            </h1>
            <p className="text-gray-600">Manage school communications and announcements</p>
          </div>
          <button 
            onClick={() => setShowComposeModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Message
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search messages by title, content, or sender..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="announcement">Announcements</option>
              <option value="notification">Notifications</option>
              <option value="message">Messages</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Total Messages</div>
          <div className="text-2xl font-bold text-gray-900">{messages.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Announcements</div>
          <div className="text-2xl font-bold text-blue-600">
            {messages.filter(m => m.message_type === 'announcement').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Notifications</div>
          <div className="text-2xl font-bold text-yellow-600">
            {messages.filter(m => m.message_type === 'notification').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-600">Read Rate</div>
          <div className="text-2xl font-bold text-green-600">
            {messages.length > 0 ? Math.round((messages.reduce((sum, m) => sum + m.read_count, 0) / messages.reduce((sum, m) => sum + m.total_recipients, 0)) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div key={message.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">{message.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full mr-2 ${getTypeColor(message.message_type)}`}>
                        {getTypeIcon(message.message_type)}
                        <span className="ml-1 capitalize">{message.message_type}</span>
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(message.priority)}`}>
                        {message.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{message.content}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>From: {message.sender.first_name} {message.sender.last_name}</span>
                        <span>To: {message.recipients.join(', ')}</span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(message.sent_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-gray-400 hover:text-blue-600">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-green-600">
                      <UserCheck className="h-4 w-4 mr-1" />
                      Read: {message.read_count}/{message.total_recipients}
                    </div>
                    <div className="text-gray-500">
                      ({Math.round((message.read_count / message.total_recipients) * 100)}% read rate)
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                      Send Follow-up
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMessages.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No messages found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || typeFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Start communicating with your school community'}
              </p>
              {!searchTerm && typeFilter === 'all' && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowComposeModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Send First Message
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Bell className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">Send Announcement</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Users className="h-6 w-6 text-green-600 mr-2" />
            <span className="text-green-600 font-medium">Message Parents</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <Send className="h-6 w-6 text-purple-600 mr-2" />
            <span className="text-purple-600 font-medium">Emergency Alert</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCommunications;
