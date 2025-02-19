import UserAnalytics from '../models/analytics.model.js';

// View user login history
export const viewUsersLogin = async (req, res) => {
  try {
    const analytics = await UserAnalytics.find().select('userId loginHistory');
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching login history', error });
  }
};

// View meditation session history
export const viewUsersMeditation = async (req, res) => {
  try {
    const analytics = await UserAnalytics.find().select('userId meditationSessions');
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching meditation sessions', error });
  }
};

// View forum interactions
export const viewForum = async (req, res) => {
  try {
    const analytics = await UserAnalytics.find().select('userId forumInteractions');
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forum interactions', error });
  }
};
